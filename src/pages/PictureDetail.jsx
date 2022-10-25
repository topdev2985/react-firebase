import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Logo from '../images/logo.png';
import { collection, onSnapshot, query, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../firebase.js';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { LinearProgress } from '@mui/material';

const ColorButton = styled(Button)(({ theme }) => ({
    color: 'white',
    backgroundColor: ' #f47064',
    borderRadius: '0px',
    fontSize: '16px',
    '&:hover': {
        backgroundColor: ' #f47064',
    },
}));
const ColorButtonOL = styled(Button)(({ theme }) => ({
    color: '#111',

    borderRadius: '0px',
    fontSize: '16px',
    borderColor: ' #f47064',
    '&:hover': {
        backgroundColor: ' #f47064',
        borderColor: ' #f47064',
    },
    '&:active': {
        backgroundColor: ' #f47064',
        borderColor: ' #f47064',
    },
    '&:focus': {
        backgroundColor: ' #f47064',
    },

}));

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export default function () {
    let navigate = useNavigate();

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
            HOME
        </Link>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            to='/'
        >
            PICTURES
        </Link>,
        <p key="3">PICTURE NAME</p>,
    ];
    const [pic, setPic] = useState('');
    const { id } = useParams();
    const [schools, setSchools] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [plaques, setPlaques] = useState([]);

    //
    const [sschool, setSschool] = useState('');
    const [ssize, setSsize] = useState({ price: 0, name: '' });
    const [splaque, setSplaque] = useState({ price: 0, name: '' });
    const [playername, setPlayername] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [sign, setSign] = useState('');
    // const [markprice, setMarkprice]
    // 
    const [sizebtn, setSizebtn] = useState('');
    const [plaquebtn, setPlaquebtn] = useState('');
    const [progressimg, setProgressimg] = useState(0);
    const [progresssign, setProgresssign] = useState(0);

    useEffect(() => {
        const q = query(doc(collection(db, 'pictures'), id));
        onSnapshot(q, (s) => {
            setPic(s.data())
        })

    }, [id]);

    useEffect(() => {
        onSnapshot(collection(db, 'sizes'), (snap) => {
            setSizes(snap.docs.map(e => ({
                id: e.id,
                item: e.data()
            })))
        });
        onSnapshot(collection(db, 'plaque'), (snap) => {
            setPlaques(snap.docs.map(e => ({
                id: e.id,
                item: e.data()
            })))
        });
        onSnapshot(collection(db, 'schools'), (snap) => {
            setSchools(snap.docs.map(e => ({
                id: e.id,
                item: e.data()
            })))
        });
    }, [])

    const checkValues = function () {
        if (sschool != '' && ssize != '' && splaque != '' && playername != '' && email != '' && image != '' && sign != '') return true;
        else return false;
    }
    const [imageurl, setImageurl]=useState('');
    const [signurl, setSignurl]=useState('');
    const addData = function () {
        

        const sotrageRef1 = ref(storage, `/playerimages/${id}_${image.name}`);
        const uploadTask1 = uploadBytesResumable(sotrageRef1, image);
        const sotrageRef2 = ref(storage, `/playersignature/${id}_${sign.name}`);
        const uploadTask2 = uploadBytesResumable(sotrageRef2, sign);
        uploadTask1.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                // update progress
                setProgressimg(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask1.snapshot.ref).then((url) => {
                    setImageurl(url);
                  
                });
                setProgressimg(0);
            }
        );
        uploadTask2.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                // update progress
                // setPercent(percent);
                setProgresssign(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask2.snapshot.ref).then((url) => {
                    // console.log(url);
                    setSignurl(url);
                  
                });
                setProgresssign(0);
            }
        );

    }
    useEffect(()=>{
        if(imageurl!=''&&signurl!=''){
            addDoc(collection(db, 'orders'), {
                picname: pic.name,
                picid: id,
                picprice: pic.price,
                school: sschool,
                size: ssize.name,
                plaque: splaque.name,
                playername: playername,
                email: email,
                sign: sign.name,
                image: image.name,
                imageurl:imageurl,
                signurl:signurl,
                timestamp: serverTimestamp()
            });
            navigate('/submit')
        }
    }, [imageurl, signurl])
    return (
        <div className='container mx-auto max-w-screen-md mb-10' >
            <img src={Logo} className='logo' />
            <Divider />
            <h4 className='my-2 text-center fonth' style={{ color: '#f47064' }}>  PERSONALIZED CANVAS PRINTS</h4>
            <Divider />
            <Breadcrumbs separator="›" aria-label="breadcrumb" style={{ fontSize: '12px', margin: '5px' }}>
                {breadcrumbs}
            </Breadcrumbs>
            <div className='mt-3'>
                <Grid container spacing={1} columns={{ xs: 3, sm: 3, md: 12 }} className=" ">
                    <Grid item xs={3} sm={3} md={6} className="">
                        <h5 className='h5 ml-5'>Snap Shot Colleage</h5>
                        <div className='m-10'>

                            <div className='w-full h-full relative picdetail-height'>
                                <img
                                    src={pic.imgurl}
                                    alt="No image"
                                    className='w-auto h-auto top-2/4 left-2/4 absolute shadow-lg shadow-gray-500'
                                    style={{
                                        transform: 'translate(-50%,-50%)'
                                    }}
                                    data-aos="zoom-y-out"
                                />
                            </div>
                        </div>


                    </Grid>
                    <Grid item xs={3} sm={3} md={6}>
                        <div className='flex flex-col mx-auto p-3'>
                            <FormControl>
                                <Select
                                    fullWidth
                                    className='w-full mb-2'
                                    size='small'
                                    onChange={e => {
                                        setSschool(e.target.value)
                                    }}
                                    value={sschool}
                                >
                                    {schools.map((e, i) => <MenuItem value={e.item.name} key={i}>{e.item.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <Paper variant='' className='flex flex-col p-2 mb-2'>
                                <h4 className='text-center mb-4'>Select Size</h4>
                                <div className='grid grid-flow-row-dense grid-cols-3'>
                                    {
                                        sizes.map((e, i) => <div key={i} className="col-span-1 m-1">
                                            <ColorButtonOL
                                                fullWidth
                                                style={{
                                                    backgroundColor: `size${i}` === sizebtn ? "#f47064" : "#fff"
                                                }}
                                                variant='outlined'
                                                onClick={(el) => {
                                                    setSsize(e.item);
                                                    setSizebtn(`size${i}`);
                                                }}
                                            >
                                                {e.item.name}
                                            </ColorButtonOL>
                                        </div>)
                                    }
                                </div>

                            </Paper>
                            <Paper variant='' className='flex flex-col p-2 mb-2'>
                                <h4 className='text-center mb-4'>Select Plaque Type</h4>
                                <div className='grid grid-flow-row-dense grid-cols-3 '>
                                    {
                                        plaques.map((e, i) => <div key={i} className="col-span-1 m-1">
                                            <ColorButtonOL
                                                fullWidth
                                                style={{
                                                    backgroundColor: `plaque${i}` === plaquebtn ? "#f47064" : "#fff"
                                                }}
                                                variant='outlined'
                                                onClick={(el) => {
                                                    setSplaque(e.item);
                                                    setPlaquebtn(`plaque${i}`);
                                                }}
                                            >
                                                {e.item.name}
                                            </ColorButtonOL>
                                        </div>)
                                    }
                                </div>
                            </Paper>

                            <TextField
                                label="Player Name"
                                placeholder='Enter Player Name'
                                size='small'
                                variant="outlined"
                                sx={{
                                    marginBottom: '0.5rem',
                                }}
                                onChange={e => {
                                    setPlayername(e.target.value)
                                }}
                                value={playername}
                            />
                            <LinearProgress color="secondary" style={{ display: progressimg == 0 ? 'none' : 'block' }} variant="determinate" value={progressimg} />
                            <ColorButton variant="contained" component="label" sx={{
                                marginBottom: '0.5rem',
                                marginTop: '0.4rem'
                            }}>
                                {image != '' ? image.name : 'Upload Image of Player'}
                                <input
                                    hidden
                                    accept="image/*"
                                    type="file"
                                    onChange={(e) => {
                                        setImage(e.target.files[0])
                                        // console.log(e.target.value)
                                    }}
                                // value={image.value}
                                />
                            </ColorButton>
                            <LinearProgress color="secondary" style={{ display: progresssign == 0 ? 'none' : 'block' }} variant="determinate" value={progresssign} />
                            <ColorButton variant="contained" component="label" sx={{
                                marginBottom: '0.9rem',
                                marginTop: '0.4rem'
                            }}>
                                {sign != '' ? sign.name : 'Upload Signature'}
                                <input
                                    hidden
                                    accept="*"
                                    type="file"
                                    onChange={(e) => {
                                        setSign(e.target.files[0])
                                    }}
                                />
                            </ColorButton>
                            <TextField
                                label="Email Address"
                                placeholder='Enter Email of Purchaser'
                                size='small'
                                variant="outlined"
                                sx={{
                                    marginBottom: '0.5rem'
                                }}
                                onChange={e => {
                                    setEmail(e.target.value)
                                }}
                                value={email}
                            />
                            <p className='mb-4'>
                                <span style={{ textDecoration: 'line-through' }}>${Number(pic.oldprice) + Number(ssize.price) + Number(splaque.price)}</span>
                                <span style={{ color: 'green' }}> ${Number(pic.price) + Number(ssize.price) + Number(splaque.price)}</span>
                            </p>
                            <ColorButton
                                type='submit'
                                size='large'
                                // sx={{
                                //     backgroundColor:'#d86937',
                                //     color:'white'
                                // }}
                                variant='contained'
                                color='success'
                                component={Link}
                                to='/submit'
                                onClick={e => {
                                    e.preventDefault();
                                    if (!checkValues()) return;
                                    addData();
                                    // navigate('/submit')
                                }}
                            >
                                Submit
                            </ColorButton>



                        </div>
                    </Grid>
                </Grid>
            </div>

        </div>


    )
}