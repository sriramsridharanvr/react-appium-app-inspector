import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  Divider,
  Chip,
  Accordion,
  AccordionSummary,
  makeStyles,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  labelStyle: {
    fontWeight: "bold",
  },
}));

const SelectedElements = ({ selectedElements, onExpanded }) => {
  const classes = useStyles();
  return (
    <div>
      <Grid container>
        <Grid xs={12}>
          <div style={{ display: "flex", flexFlow: "row wrap" }}>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Selected Elements
            </Typography>
            <Chip
              color="secondary"
              label={`${selectedElements.length} Selected`}
            />
          </div>
        </Grid>
        <Grid xs={12}>
          <Divider style={{ margin: "20px 0" }} />
        </Grid>
        <Grid xs={12}>
          <div>
            {selectedElements.map((element) => (
              <Accordion
                key={element.elementId}
                onChange={(evt, expanded) => {
                  onExpanded(expanded ? element : null);
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`element-${element.elementId}-content`}
                  id={`element-${element.elementId}-header`}
                >
                  <Typography className={classes.heading}>
                    {element.label}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    {Object.keys(element.attributes).map((key) => (
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={3}>
                            <Typography
                              variant="body1"
                              className={classes.labelStyle}
                            >
                              {key}
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <Typography variant="body2">
                              {element.attributes[key]}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SelectedElements.propTypes = {
  selectedElements: PropTypes.array.isRequired,
};

export default SelectedElements;
