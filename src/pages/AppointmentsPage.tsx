import { Box, Card, Flex, Group, Loader, Stack, Text, Title } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { formatDateTime } from '@medplum/core';
import { Appointment } from '@medplum/fhirtypes';
import { Document, ResourceName, useMedplum, useMedplumNavigate } from '@medplum/react';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '../components/ThemeToggle';

/**
 * Appointments page that displays a calendar view of upcoming appointments.
 * @returns A React component that displays the appointments calendar.
 */
export function AppointmentsPage(): JSX.Element {
  const medplum = useMedplum();
  const navigate = useMedplumNavigate();
  const [month, setMonth] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDayAppointments, setSelectedDayAppointments] = useState<Appointment[]>([]);

  // Function to fetch appointments for the selected month
  const fetchAppointments = async (date: Date) => {
    setLoading(true);
    
    // Calculate the first and last day of the month
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    // Format dates for FHIR search
    const startDate = firstDay.toISOString().split('T')[0];
    const endDate = lastDay.toISOString().split('T')[0];
    
    try {
      // Search for appointments in the selected month range
      const appointmentsResult = await medplum.search('Appointment', {
        'date:ge': startDate,
        'date:le': endDate,
        _count: '100',
        _sort: 'date'
      });
      
      // Extract appointments from the Bundle's entry array
      const appointmentsArray = appointmentsResult.entry?.map(entry => entry.resource as Appointment) || [];
      setAppointments(appointmentsArray);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch appointments when component mounts or month changes
  useEffect(() => {
    fetchAppointments(month);
  }, [month]);

  // Update selected day appointments when date or all appointments change
  useEffect(() => {
    if (selectedDate) {
      const dateString = selectedDate.toISOString().split('T')[0];
      const filteredAppointments = appointments.filter(appointment => {
        const startTime = appointment.start;
        return startTime && startTime.startsWith(dateString);
      });
      setSelectedDayAppointments(filteredAppointments);
    } else {
      setSelectedDayAppointments([]);
    }
  }, [selectedDate, appointments]);

  // Handle month change
  const handleMonthChange = (date: Date) => {
    setMonth(date);
  };

  // Get dates with appointments for highlighting on calendar
  const getDatesWithAppointments = () => {
    return appointments.map(appointment => {
      // Extract date from appointment start time
      const startTime = appointment.start;
      if (startTime) {
        return new Date(startTime);
      }
      return undefined;
    }).filter(Boolean) as Date[];
  };

  // Handle day click to show appointments for that day
  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  // Format appointment time for display
  const formatAppointmentTime = (appointment: Appointment): string => {
    if (appointment.start) {
      return formatDateTime(appointment.start);
    }
    return 'No time specified';
  };

  // Get appointment status display
  const getStatusDisplay = (status: string | undefined): string => {
    if (!status) return 'Unknown';
    
    // Capitalize first letter
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Document>
      <Title>
        Appointments Calendar
      </Title>
      <Flex gap="md" mt="md" direction={{ base: 'column', md: 'row' }}>
        <Box>
          <Calendar 
            defaultDate={selectedDate || undefined}
            date={month}
            onDateChange={handleMonthChange}
            getDayProps={(date) => {
              // Highlight days with appointments
              const dateString = date.toISOString().split('T')[0];
              const hasAppointment = getDatesWithAppointments().some(
                appDate => appDate.toISOString().split('T')[0] === dateString
              );
              
              const isSelectedDate = selectedDate ? dateString === selectedDate.toISOString().split('T')[0] : false;
              
              return {
                selected: hasAppointment || isSelectedDate,
                onClick: () => handleDayClick(date),
              };
            }}
            styles={(theme) => ({
              day: {
                '&[data-selected]': {
                  backgroundColor: theme.colors.blue[6],
                  color: theme.white,
                },
              },
            })}
          />
        </Box>
        
        <Box style={{ flexGrow: 1 }}>
          {loading ? (
            <Loader />
          ) : selectedDate ? (
            <Stack>
              <Title order={3}>
                Appointments for {selectedDate.toLocaleDateString()}
              </Title>
              
              {selectedDayAppointments.length === 0 ? (
                <Text>No appointments scheduled for this day.</Text>
              ) : (
                selectedDayAppointments.map((appointment) => (
                  <Card 
                    key={appointment.id} 
                    shadow="sm" 
                    padding="md" 
                    radius="md" 
                    withBorder
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/Appointment/${appointment.id}`)}
                  >
                    <Group justify="space-between">
                      <Text fw={500}>{formatAppointmentTime(appointment)}</Text>
                      <Text c="dimmed" size="sm">
                        Status: {getStatusDisplay(appointment.status)}
                      </Text>
                    </Group>
                    
                    <Text mt="xs">
                      {appointment.description || 'No description provided'}
                    </Text>
                    
                    {appointment.participant && (
                      <Box mt="md">
                        <Text size="sm" fw={500}>Participants:</Text>
                        {appointment.participant.map((participant, index) => (
                          <Text key={index} size="sm">
                            {participant.actor && (
                              <ResourceName value={participant.actor} />
                            )}
                          </Text>
                        ))}
                      </Box>
                    )}
                  </Card>
                ))
              )}
            </Stack>
          ) : (
            <Text>Select a date to view appointments.</Text>
          )}
        </Box>
      </Flex>
    </Document>
  );
}
