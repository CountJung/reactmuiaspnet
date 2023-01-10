import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import fs from 'fs';

//class ImageGallery extends Component (path) {
//    state = {
//        images: []
//    }

//    componentDidMount() {
//        // Watch the specified folder for changes
//        fs.watch('/path/to/folder', (eventType, filename) => {
//            // Update the list of images in the state when a change is detected
//            this.setState({ images: fs.readdirSync('/path/to/folder') });
//        });
//    }

//    render() {
//        return (
//            <Grid container spacing={3}>
//                {this.state.images.length > 0 ? (
//                    this.state.images.map(image => (
//                        <Grid item xs={3}>
//                            <img src={`/path/to/folder/${image}`} alt={image} />
//                        </Grid>
//                    ))
//                ) : (
//                    <Typography variant="h6">No images found</Typography>
//                )}
//            </Grid>
//        );
//    }
//}

export default class ImageGallery {
    constructor() {
        this.images = [];

        // Watch the specified folder for changes
        fs.watch('/path/to/folder', (eventType, filename) => {
            // Update the list of images when a change is detected
            this.images = fs.readdirSync('/path/to/folder');
        });
    }
    render() {
        const gallery = new ImageGallery();

        return (
            <div>
                <Grid container spacing={3}>
                    ${gallery.images.length > 0 ? (
                        gallery.images.map(image => {
                            <Grid item xs={3}>
                                <img src="/path/to/folder/${image}" alt="${image}" />
                            </Grid>
                        }
                        ).join('')
                    ) : (
                        <Typography variant="h6">No images found</Typography>
                    )}
                </Grid>
            </div>
        );
    }
}
