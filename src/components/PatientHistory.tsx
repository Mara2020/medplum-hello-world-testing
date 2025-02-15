import { Button, Title } from '@mantine/core';
import { DateTimeInput, Document, ResourceHistoryTable } from '@medplum/react';
import { useParams } from 'react-router-dom';

export function PatientHistory(): JSX.Element {
  const { id } = useParams();
  return (
    <Document>
      <Title order={3} mb="xl">
        Patient History
      </Title>
      <DateTimeInput name="test" />
      <Button variant="filled">Test</Button>
      <ResourceHistoryTable resourceType="Patient" id={id} />
    </Document>
  );
}
