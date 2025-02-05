import { Container, Typography, Box } from "@mui/material";
import { Task, GroupAdd } from "@mui/icons-material"; 

export default function About() {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", py: 3 }}> 
      <Typography color="primary" variant="h3" fontWeight="bold" gutterBottom>
        About Us
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph sx={{ marginBottom: 1 }}> 
        RecipeApp was founded with a simple yet powerful vision: to bring people together through the love of food.
      </Typography>
      
      <Box my={2}> 
        <Typography variant="body1" color="text.secondary">
          Our journey started with a group of passionate food enthusiasts who believed that cooking should be fun, accessible, 
          and a source of creativity. We wanted to create a space where chefs, home cooks, and food lovers of all backgrounds 
          could share their favorite recipes, exchange tips, and inspire one another.
        </Typography>
      </Box>
      
      <Typography color="primary" variant="h5" fontWeight="bold" mt={3}> 
        <Task sx={{ verticalAlign: 'middle', marginRight: 1 }} /> Our Mission
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph sx={{ marginBottom: 1 }}>
        At RecipeApp, we strive to make cooking an enjoyable experience for everyone. Whether you are a beginner or an expert,
        our platform offers the tools and community support to help you explore new recipes and enhance your skills.
      </Typography>
      
      <Typography color="primary" variant="h5" fontWeight="bold" mt={3}>
        <GroupAdd sx={{ verticalAlign: 'middle', marginRight: 1 }} /> Join Us
      </Typography>
      <Typography variant="body1" color="text.secondary">
        We believe food connects people, and we'd love for you to be part of our growing community. Share your recipes, discover
        new flavors, and be inspired!
      </Typography>
    </Container>
  );
}