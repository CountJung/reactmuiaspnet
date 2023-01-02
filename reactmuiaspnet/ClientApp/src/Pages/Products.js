import { Box, Container, Grid, Pagination, Stack } from '@mui/material';
import { ProductCard } from '../components/ProductCard';
import { products } from '../ControlDatas/Products';

export const ProductPage = () => (
    <>
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Container maxWidth={false}>
                <Box sx={{ pt: 3 }}>
                    <Grid
                        container
                        spacing={2}
                    >
                        {products.map((product) => (
                            <Grid
                                item
                                key={product.id}
                                lg={3}
                                md={6}
                                xs={12}
                            >
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pt: 3
                    }}
                >
                    <Pagination
                        color="primary"
                        count={4}
                        size="small"
                    />
                </Box>
            </Container>
        </Box>
    </>
    );