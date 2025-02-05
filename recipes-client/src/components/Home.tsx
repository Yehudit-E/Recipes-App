import { Container, Typography, Button, Box, Grid, Card, CardContent } from "@mui/material";
import { RestaurantMenu, Favorite, AddCircle, ListAlt } from "@mui/icons-material";
import { Link } from "react-router";

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", py: 5 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Welcome to RecipeApp 
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph>
        Your ultimate platform for discovering, sharing, and creating mouth-watering recipes!
      </Typography>
      
      <Box my={4}>
        <Button component={Link} to="/recipes" variant="contained" color="primary" size="large" startIcon={<RestaurantMenu />}>
          Explore Recipes
        </Button>
      </Box>
      
      <Grid container spacing={3} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card sx={{ textAlign: "center", p: 2 }}>
              <CardContent>
                <feature.icon sx={{ fontSize: 40, color: "primary.main" }} />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">{feature.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Box mt={5}>
        <Typography variant="h5" fontWeight="bold">
          Join our growing community and get inspired by fellow foodies!!
        </Typography>
      </Box>
    </Container>
  );
}

const features = [
  { title: "Browse Recipes", description: "Explore a wide variety of curated recipes.", icon: RestaurantMenu },
  { title: "Save Favorites", description: "Keep track of your favorite recipes.", icon: Favorite },
  { title: "Submit Your Own", description: "Share your own recipes with the community.", icon: AddCircle },
  { title: "Step-by-Step Guide", description: "Get detailed instructions and ingredients.", icon: ListAlt }
];


