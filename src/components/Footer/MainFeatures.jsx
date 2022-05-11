import React from 'react';
import Grid from '@mui/material/Grid';
import { mainFeaturesInfo } from '../../data/components/footer.jsx';

const MainFeatures = () => (
  <Grid item xs={12} md={4} mb={{ xs: 3, lg: 0 }}>
    <header className="footer__header">
      MAIN FEATURES
    </header>
    <ul className="footer__list">
      {
        mainFeaturesInfo.map(({ label }) => (
          <li className="footer__list-item">
            {label}
          </li>
        ))
      }
    </ul>
  </Grid>
);

export default MainFeatures;
