import { Box, Container, Grid, Pagination, Button, Link } from '@mui/material';
import { ProductCard } from '../components/ProductCard';
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from 'react';

let products = [
    {
        id: uuid(),
        createdAt: '27/03/2019',
        description: 'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
        media: '/static/images/products/product_1.png',
        title: 'Dropbox',
        totalDownloads: '594'
    },
    {
        id: uuid(),
        createdAt: '31/03/2019',
        description: 'Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.',
        media: '/static/images/products/product_2.png',
        title: 'Medium Corporation',
        totalDownloads: '625'
    },
    {
        id: uuid(),
        createdAt: '03/04/2019',
        description: 'Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.',
        media: '/static/images/products/product_3.png',
        title: 'Slack',
        totalDownloads: '857'
    },
    {
        id: uuid(),
        createdAt: '04/04/2019',
        description: 'Lyft is an on-demand transportation company based in San Francisco, California.',
        media: '/static/images/products/product_4.png',
        title: 'Lyft',
        totalDownloads: '406'
    },
    {
        id: uuid(),
        createdAt: '04/04/2019',
        description: 'GitHub is a web-based hosting service for version control of code using Git.',
        media: '/static/images/products/product_5.png',
        title: 'GitHub',
        totalDownloads: '835'
    },
    {
        id: uuid(),
        createdAt: '04/04/2019',
        description: 'Squarespace provides software as a service for website building and hosting. Headquartered in NYC.',
        media: '/static/images/products/product_6.png',
        title: 'Squarespace',
        totalDownloads: '835'
    },
    //{
    //    id: uuid(),
    //    createdAt: '02/01/2022',
    //    description: 'GitHub is a web-based hosting service for version control of code using Git.',
    //    media: '/static/images/products/product_5.png',
    //    title: 'GitHub2',
    //    totalDownloads: '123'
    //},
];

const ProductSampleData =
{
    id: uuid(),
    createdAt: '02/01/2022',
    description: 'GitHub is a web-based hosting service for version control of code using Git.',
    media: '/static/images/products/product_5.png',
    title: 'GitHub2',
    totalDownloads: '123'
};

const updateProductList = () => {
    const productList = document.getElementById('product-list');
    //productList.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.innerText = product.title;
        productList.appendChild(productElement);
    });
};

export function ProductPage () {
    const [productDatas, setProductDatas] = useState([]);
    const InitProductDatas = () => {
        setProductDatas(products);
        ProductContents();
    }

    useEffect(() => { InitProductDatas() }, {});

    const AddProduct = () => {
        products.push(ProductSampleData);
        //updateProductList();
        //ChatGPT -
        //you can use the setState method of the functional component to update the productDatas state variable and trigger a re - render of the component.
        //This will update the productDatas state variable with the new products array, which will trigger a re-render of the component and cause the changes to the array to be reflected on the webpage.
        setProductDatas([...products]);
        //ProductContents();
        //window.location.reload();
        //window.history.go(0);
    };

    const ProductContents = () => {
        return (
            <Grid
                container
                spacing={2}
            >
                {
                    productDatas.map((product) => (
                        <Grid
                            item
                            key={product.id}
                            lg={3}
                            md={6}
                            xs={12}
                        >
                            <ProductCard product={product} />
                        </Grid>
                    ))
                }
            </Grid>
        );
    };
    const contents = ProductContents();

    return (
        <div>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth={false}>
                    <Box sx={{ pt: 3 }}>
                        {/*<Link href="/Home">HomeLink</Link>*/}
                        <Button sx={{ mr: 2 }} variant="contained" onClick={AddProduct}>TestBtn</Button>
                        {/*<Grid*/}
                        {/*    container*/}
                        {/*    spacing={2}*/}
                        {/*>*/}
                        {/*    {products.map((product) => (*/}
                        {/*        <Grid*/}
                        {/*            item*/}
                        {/*            key={product.id}*/}
                        {/*            lg={3}*/}
                        {/*            md={6}*/}
                        {/*            xs={12}*/}
                        {/*        >*/}
                        {/*            <ProductCard product={product} />*/}
                        {/*        </Grid>*/}
                        {/*    ))}*/}
                        {/*</Grid>*/}
                        {/*<script defer>*/}
                            {contents}
                        {/*</script>*/}
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
        </div>
    );
};