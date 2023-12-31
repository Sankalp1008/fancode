import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({

    mainCard: {
        [theme.breakpoints.down('sm')]: {

            minWidth: 160,
            margin: 10,
            position: 'relative',
            textAlign: 'center',
        },
        '& img': {
            [theme.breakpoints.down('sm')]: {
                width: '100%',
            }
        },

        '& .details': {
            [theme.breakpoints.down('sm')]: {

                position: 'absolute',
                bottom: -4,
                // left:4,
                width: '100%',
                backgroundImage: 'linear-gradient(#250606c9,#2b0a0a)'
            },
            '& .title': {
                [theme.breakpoints.down('sm')]: {
                    color: 'white',
                    fontSize: 10,
                    fontWeight: 600,
                    position: 'relative',
                    left: 4,

                    textAlign: 'left',
                    width: '90%',

                }
            },
            '& .rating': {
                [theme.breakpoints.down('sm')]: {
                    color: 'white',
                    fontSize: 10,
                    fontWeight: 600,
                    position: 'relative',
                    left: 4,
                    textAlign: 'left',
                    width: '80%',

                }
            },
            '& .genre': {
                [theme.breakpoints.down('sm')]: {
                    color: 'white',
                    fontSize: 10,
                    fontWeight: 600,
                    position: 'relative',
                    left: 4,
                    textAlign: 'left',
                    width: '80%',
                    // textDecoration:'underline',


                }
            },
            '& .desc': {
                [theme.breakpoints.down('sm')]: {
                    color: 'white',
                    fontSize: 10,
                    fontWeight: 600,
                    position: 'relative',
                    left: 2,
                    textAlign: 'left',
                    width: '90%',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',

                }
            },
        },



    }

}))

const MovieCards = ({ image, title, rating, genre, cast, director, desc }) => {
    const classes = useStyles()
    return (
        <div className={classes.mainCard}>
            <img src={image} alt="img" />
            <div className='details'>
                <div className='title'>{title}</div>
                <div className='rating'>
                    {rating}
                </div>
                <div className='genre'>
                    {genre}
                </div>

            </div>
        </div>
    )
}

export default MovieCards