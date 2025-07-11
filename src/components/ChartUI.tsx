import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

export default function ChartUI({
  dataFetcherOutput,
}: {
  dataFetcherOutput: {
    loading: boolean;
    error: string | null;
    data: {
      hourly: {
        time: string[];
        temperature_2m: number[];
        wind_speed_10m: number[];
      };
    } | null;
  };
}) {
  const { loading, error, data } = dataFetcherOutput;

  if (loading) return <Typography>Cargando datos...</Typography>;
  if (error)   return <Typography>Error: {error}</Typography>;
  if (!data)   return <Typography>No hay datos disponibles</Typography>;

  const { time, temperature_2m, wind_speed_10m } = data.hourly;

  const xAxisConfig = {
    scaleType: 'point' as const,
    data: time,
    tickMinStep: 24,
    tickLabelInterval: (value: any, index: number) => index % 24 === 0,
  };

  const valueFormatter = (value: string) => {
    const date = new Date(value);
    return date.toLocaleDateString('es-ES', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <Typography variant="h5" component="div" sx={{ mb: 2 }}>
        Temperatura y Velocidad del Viento (horario)
      </Typography>
      <LineChart
        height={300}
        series={[
          { data: temperature_2m, label: 'Temperatura °C (2m)' },
          { data: wind_speed_10m, label: 'Viento Km/h (10m)' },
        ]}
        xAxis={[{
          ...xAxisConfig,
          valueFormatter, // Aplica el formateador de fechas
        }]}
        sx={{
          '& .MuiChartsAxis-tickLabel': {
            
          }
        }}
      />
    </>
  );
}