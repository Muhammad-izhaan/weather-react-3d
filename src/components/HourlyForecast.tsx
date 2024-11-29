import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { HourlyForecastProps } from '../types/weather';

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyData }) => {
  const theme = useTheme();

  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      sx={{
        background: 'rgba(17, 25, 40, 0.75)',
        backdropFilter: 'blur(20px)',
        width: '100%',
        mb: 2,
      }}
    >
      <CardContent>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            mb: 2,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          HOURLY FORECAST
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            pb: 2,
            '::-webkit-scrollbar': {
              height: 6,
              bgcolor: 'rgba(0, 0, 0, 0.1)',
              borderRadius: 3,
            },
            '::-webkit-scrollbar-thumb': {
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 3,
            },
          }}
        >
          {hourlyData.map((hour, index) => (
            <Box
              key={index}
              sx={{
                minWidth: 80,
                textAlign: 'center',
                background: index === 0 ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                borderRadius: 2,
                p: 2,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                {index === 0 ? 'Now' : format(new Date(hour.time), 'HH:mm')}
              </Typography>
              <Typography variant="h5" sx={{ mb: 1 }}>
                {Math.round(hour.temp_c)}°
              </Typography>
              <Box
                component="img"
                src={hour.condition.icon}
                alt={hour.condition.text}
                sx={{
                  width: 40,
                  height: 40,
                  filter: 'brightness(1.2)',
                }}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default HourlyForecast;
