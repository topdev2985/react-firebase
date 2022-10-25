import React, { useState, useEffect } from 'react';
import { Divider, Grid } from '@mui/material';
// import './App.css';
import FirePictures from './FirePictures';
import FirePlaque from './FirePlaque';
import FireSchool from './FireSchool';
import FireSizes from './FireSizes';
function App() {
   
    return (
      <div className='container mx-auto'>
        <h3 className='h3 mt-20 mb-5 text-center'>Manage Firebase Database</h3>
        <Divider />
        <Grid spacing={1} container columns={{md:6, sm:6, xs:3}}>
            <Grid item md={3} sm={6} xs={3}>
                <FirePictures />
            </Grid>
            <Grid item md={3} sm={6} xs={3}>
                <FirePlaque />
                <FireSchool />
                <FireSizes />
            </Grid>
            
        </Grid>
      </div>
    );
}
export default App;