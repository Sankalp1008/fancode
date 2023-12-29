import React from 'react'
import logo from '../../../images/fancode-fc.png'
import { Tab, Tabs, makeStyles ,Box,Typography} from '@material-ui/core'
import PropTypes from 'prop-types'
const useStyles = makeStyles(theme =>({
root:{
 flexGrow:1,
},

  mainHeader:{
background:'#242424',
position:'sticky',
zIndex: 100,
left: 0,

top:0,
  },

  logo:{
    [theme.breakpoints.down('sm')]: {
      padding : '10.735px 36.827px 1.069px 7px',
      alignItems:'center',
    }
  },

  filters:{
    '& .MuiTabs-indicator': {
      display: 'none',
    },
    '& .MuiTabs-flexContainer': {
      // padding:16,
      display: 'flex',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gridColumnGap: 10,
      [theme.breakpoints.down('sm')]: {
        gridColumnGap: 10,
      },
    },
  },

  tabTitle:{
    color:'white',
    gap:10,
    fontFamily:'Saira, sans-serif',
    backgroundColor: '#484848',
    borderRadius: 4,
    fontSize: '14px !important',
    textTransform:'capitalize',
    fontWeight: 400,
    minHeight: 34,
    '&.Mui-selected': {
      backgroundColor: '#F0283C',
      color: '#ffffff',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '8px',
    },
  },

  tabSelected:{
    color:'white',
    gap:10,
    fontFamily:'Saira, sans-serif',
    backgroundColor: '#F0283C',
    borderRadius: 4,
    fontSize: '14px !important',
    textTransform:'capitalize',
    fontWeight: 400,
    minHeight: 34,
    '&.Mui-selected': {
      backgroundColor: '#F0283C',
      color: '#ffffff',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '8px',
    },
  },

 

}))

const TabPanel = ({ children, value, isSelected }) => {
  return (
    <div role="tabpanel" hidden={!isSelected}>
      {/* {isSelected && } */}
    </div>
  );
};


const Header = ({value,handleChange=()=>null,filterData=[],genreValue}) => {

  const classes = useStyles()
  const isTabSelected = (tabValue) => genreValue.includes(tabValue);

  return (
    
    <div style={{ position: 'sticky', top: 0, zIndex: 999 }}> 
    <style>
@import url('https://fonts.googleapis.com/css2?family=Saira&display=swap');
</style>
    <div className={classes.mainHeader}>
      <div className={classes.logo}>
      <img src={logo} alt='logo'/>
      </div>
      <div >
          <div style={{padding:'0px 16px 1px 16px'}}>
                  <Box mt={4} className={classes.filters}>

 <Tabs 
aria-label="multi-select tabs example"
 variant='scrollable'
 onChange={handleChange}
 value={genreValue}

 >
 {filterData && filterData.map((item,idx)=>

(
    <Tab
    // {...a11yProps(idx)}
    label={item.name}
    className={isTabSelected(item.id) ? classes.tabSelected :classes.tabTitle}
    value={item.id}
    

    /> 
  
)
)}

 </Tabs>
 {genreValue.map((selectedTab) => (
        <TabPanel key={selectedTab} value={selectedTab} isSelected={isTabSelected(selectedTab)}>
          {/* Content for each selected tab */}
        </TabPanel>
      ))}

 </Box>

{/* <div className={classes.tabsWrapper}>
<TabPanel value={item.id} index={item.id}>
<Box
  display="flex"
  justifyContent="space-between"
  alignItems="center"
>
<Typography>{item.name}</Typography>
</Box>
</TabPanel>
</div> */}
</div>

      </div>
    </div>
    </div>
  )
}

export default Header