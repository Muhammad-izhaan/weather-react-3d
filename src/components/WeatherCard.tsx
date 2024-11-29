import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  useTheme,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { motion } from 'framer-motion';
import { WeatherCardProps } from '../types/weather';

interface WeatherDetailProps {
  icon: React.ComponentType<{ sx: object }>;
  label: string;
  value: number;
  unit: string;
  description?: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  temperature,
  condition,
  location,
  feelsLike,
  humidity,
  visibility,
  precipitation,
}) => {
  const theme = useTheme();

  const WeatherDetail: React.FC<WeatherDetailProps> = ({ icon: Icon, label, value, unit, description = '' }) => (
    <Box
      sx={{
        background: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 2,
        p: 2,
        height: '100%',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Icon sx={{ fontSize: 16, opacity: 0.7 }} />
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Box>
      <Typography variant="h5" sx={{ mb: 0.5 }}>
        {value}
        {unit}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      )}
    </Box>
  );

  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        background: 'rgba(17, 25, 40, 0.75)',
        backdropFilter: 'blur(20px)',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <CardContent>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <LocationOnIcon sx={{ fontSize: 20, opacity: 0.7 }} />
              <Typography variant="h6" color="text.secondary">
                {location}
              </Typography>
            </Box>
            <Typography variant="h1" sx={{ mb: 2 }}>
              {temperature}°
            </Typography>
            <Typography variant="h4" sx={{ mb: 1 }}>
              {condition}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Today, expect {condition.toLowerCase()} with temperatures reaching a maximum of {temperature}°C. Make
              sure to grab your umbrella and raincoat before heading out.
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <WeatherDetail
                icon={ThermostatIcon}
                label="FEELS LIKE"
                value={feelsLike}
                unit="°"
                description="Humidity is making it feel warmer"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <WeatherDetail
                icon={WaterDropIcon}
                label="PRECIPITATION"
                value={precipitation}
                unit='"'
                description="in last 24h"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <WeatherDetail
                icon={VisibilityIcon}
                label="VISIBILITY"
                value={visibility}
                unit=" mi"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <WeatherDetail
                icon={WaterDropIcon}
                label="HUMIDITY"
                value={humidity}
                unit="%"
                description="The dew point is 25° right now"
              />
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%)',
            zIndex: 0,
          }}
        />
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
