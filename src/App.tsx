import React, { useState, useEffect } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  CircularProgress,
  Typography,
  TextField,
  IconButton,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import WeatherCard from './components/WeatherCard';
import WeatherScene from './components/WeatherScene';
import HourlyForecast from './components/HourlyForecast';
import { WeatherData } from './types/weather';
import theme from './theme';

const API_KEY = 'e4b1a770a816413781b94549240311';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState('');
  const [showFooter, setShowFooter] = useState(false);

  const fetchWeatherData = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=7&aqi=no`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setShowFooter(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(`${latitude},${longitude}`);
          },
          () => {
            fetchWeatherData('auto:ip');
          }
        );
      } else {
        fetchWeatherData('auto:ip');
      }
    };

    getLocation();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherData(city);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress size={60} />
          <Typography variant="h6" color="primary">
            Detecting location...
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4" color="error">
            {error}
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0a1929 0%, #001e3c 100%)',
          pt: 4,
          pb: 10,
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Box
              component="form"
              onSubmit={handleSearch}
              sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}
            >
              <Box sx={{ width: '100%', maxWidth: 400 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search city..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <IconButton type="submit" color="primary">
                        <Search />
                      </IconButton>
                    ),
                  }}
                />
              </Box>
            </Box>

            <AnimatePresence mode="wait">
              {weatherData && (
                <motion.div
                  key={city || 'default'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Box
                    sx={{
                      height: 400,
                      bgcolor: 'background.paper',
                      borderRadius: theme.shape.borderRadius,
                      overflow: 'hidden',
                      mb: 4,
                    }}
                  >
                    <Canvas>
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} />
                      <WeatherScene
                        condition={weatherData.current.condition.text}
                        isDay={true}
                      />
                    </Canvas>
                  </Box>

                  <motion.div variants={itemVariants}>
                    <WeatherCard
                      temperature={Math.round(weatherData.current.temp_c)}
                      condition={weatherData.current.condition.text}
                      location={`${weatherData.location.name}, ${weatherData.location.country}`}
                      feelsLike={Math.round(weatherData.current.feelslike_c)}
                      humidity={weatherData.current.humidity}
                      windSpeed={weatherData.current.wind_kph}
                    />
                  </motion.div>

                  <Box sx={{ mt: 4 }}>
                    <HourlyForecast
                      hourlyData={weatherData.forecast.forecastday[0].hour}
                    />
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
