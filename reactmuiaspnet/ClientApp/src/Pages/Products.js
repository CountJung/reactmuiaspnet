import { Box, Container, Grid, Pagination, Button, Link, Stack } from '@mui/material';
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
            {/*The Box component works as a "Wrapper" for the component you want to "Modify" the spacing.*/}
            {/*then you can use the next properties on the component:*/}
            {/*The space utility converts shorthand margin and padding props to margin and padding CSS declarations. The props are named using the format {property}{sides}.*/}
            {/*Where property is one of:*/}
            {/*m - for classes that set margin p - for classes that set padding*/}
            {/*Where sides is one of:*/}
            {/*t - for classes that set margin-top or padding-top*/}
            {/*b - for classes that set margin-bottom or padding-bottom*/}
            {/*l - for classes that set margin-left or padding-left*/}
            {/*r - for classes that set margin-right or padding-right*/}
            {/*x - for classes that set both *-left and *-right*/}
            {/*y - for classes that set both *-top and *-bottom*/}
            {/*blank - for classes that set a margin or padding on all 4 sides of the element*/}
            {/*as an example:*/}
            {/*<Box m={2} pt={3}>*/}
            {/*    <Button color="default">*/}
            {/*        Your Text*/}
            {/*    </Button>*/}
            {/*</Box>*/}
            <Box
                component="main"
                sx={{
                    backgroundColor: 'primary.light',
                    flexGrow: 1, display: 'flex', justifyContent: 'flex-end',
                    my: 8, mx:2
                }}
            >
                <Container maxWidth="false">
                    <Box sx={{ px: 2, py:2 }}> {/*spacing={2} direction="column"*/}
                        <Button sx={{ px: 2, my: 2}} variant="contained" onClick={AddProduct}>TestBtn</Button>
                            {contents}
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