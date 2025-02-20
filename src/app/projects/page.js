'use client';
import { Box, Card, CardContent, CardMedia, CardActions, Button, Typography, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const theme = createTheme();

export default function Projects() {
  const projects = [
    {
      title: "A full-stack banking web application", 
      description: "As part of the training program for 2023 PBWM Technology Analysts, a simple prototype to demonstrate CRUD operations for bank clients.", 
      image: '/bank_app.jpg', 
      link: 'https://github.com/aerinng/neueda-fe-project'
    }, 
    {
      title: "Exploring Portfolio Decarbonization using AI", 
      description: "Using NLP techniques to understand the decarbonization targets and effort made by financial institutions across asian banks, asset managers, insurance, pension funds.", 
      image: '/portfolio_decarbonization.png', 
      link: 'https://github.com/cl-xy/bt4103_esg'
    }, 
  ]

  return (
    <ThemeProvider theme={theme}>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Projects</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={index} sx={{ 
              maxWidth: 345,
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Box sx={{ 
                position: 'relative',
                paddingTop: '56.25%', // 16:9 aspect ratio
                width: '100%'
              }}>
                <CardMedia
                  component="img"
                  image={project.image}
                  alt={project.title}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {project.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {project.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href={project.link} target="_blank">
                  Project Details
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
}