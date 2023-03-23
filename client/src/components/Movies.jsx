import React, { useEffect, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Box, ModalCloseButton, Button, Center } from '@chakra-ui/react';
import '../Style/movie.css';
import Pagination from './Pagination';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie'
import { useToast } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
export default function Movies() {
    const navigate = useNavigate();
    const toast = useToast()
    const cookies = new Cookies();
    const [data, setData] = useState([]);
    const userId = cookies.get('userId', { path: '/' });
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(9);
    const [datalength, setDatalength] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedtitle, setSelectedTitle] = useState(null);
    const [userRating, setUserRating] = useState(0);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);


    const display = async () => {
        try {
            const res = await fetch('https://propvr-assignment.vercel.app/movies');
            const data = await res.json();

            setData(data);
            setDatalength(data.length);
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        display();
    }, []);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const paginateData = data.slice(firstPostIndex, lastPostIndex);

    const handleRatingClick = (id, Title) => {
        // if(!cookies.get(userId)){
        //     toast({
        //         title: `Please Login First!`,
        //         position: 'top',
        //         status: 'error',
        //         duration: 4000,
        //         isClosable: true,
        //     })

        //     return navigate("/login");
        // }
        // else{
            setSelectedId(id);
            setSelectedTitle(Title);
            setModalOpen(true);
        // }
        
    };

    const handleRatingSubmit = async () => {
        
        if (rating < 1) {
            return alert("Please select a rating");
        }
        try {
            const res = await axios.put('https://propvr-assignment.vercel.app/movies/rating',
                {
                    rating: rating,
                    id: selectedId
                }, {
                headers: {
                    authorization: cookies.get('token')
                }
            })
            toast({
                title: `You Rated Movie: ${selectedtitle}`,
                position: 'top',
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            display();
            setRating(0);
            setSelectedTitle(null);
            setModalOpen(false);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDeleteRatingClick = async (postId, Title) => {
        try {
            const res = await axios.delete('https://propvr-assignment.vercel.app/movies/removeRating', {
                data: {
                    id: postId,
                    userId: cookies.get('userId')
                }
            })
            toast({
                title: `You Removed Your Rating From Movie: ${Title}`,
                position: 'top',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            display();

        } catch (error) {
            
            toast({
                title: "Something went wrong",
                position: 'top',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    return (
        <>
            <div className='movie-container'>
                <div className='movies-card-container'>
                    <div className='movies-card'>
                        {paginateData.length > 0 ? (
                            paginateData.map((el, i) => {
                                return (
                                    <div className='card' key={i.toString()}>
                                        <img src={el.Poster} alt='' />
                                        <p>Title: {el.Title}</p>
                                        <p>Releasing Year: {el.Year}</p>
                                        <p>Ratings: {el.averageRating.toFixed(1)}<span style={{ color: "#E68801", fontSize: "24px" }}>&#9733;</span></p>

                                        {el.ratings.filter(r => r.userId === userId).length > 0 ? (
                                            <div className='delete-rating'>
                                                <p>Your Rating: {el.ratings.filter(r => r.userId === userId)[0].rating}<span style={{ color: "#E68801", fontSize: "24px" }}>&#9733;</span></p>
                                                <button className='btn-card' onClick={() => handleDeleteRatingClick(el._id, el.Title)}>
                                                    Delete Rating
                                                </button>
                                            </div>
                                        ) : (
                                            <button className='btn-card' onClick={() => handleRatingClick(el._id, el.Title)}>
                                                Give Your Rating
                                            </button>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <div style={{display:"flex",textAlign:"center"}}><Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        /></div>
                            
                        )}
                    </div>
                </div>
            </div>

            <Pagination totalPosts={datalength} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Give Your Rating</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        
                        {/* Add your rating input fields here */}
                        {cookies.get(userId)?<div>
                            <p>Selected Movie : {selectedtitle}</p>
                            <div className="star-rating">
                                {[...Array(5)].map((star, index) => {
                                    index += 1;
                                    return (
                                        <button
                                            type="button"
                                            key={index}
                                            className={index <= (hover || rating) ? "on" : "off"}
                                            onClick={() => setRating(index)}
                                            onMouseEnter={() => setHover(index)}
                                            onMouseLeave={() => setHover(rating)}
                                        >
                                            <span className="star">&#9733;</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        :
                        <div className="login-popup">
                            
                            <h1>Please login First!</h1>
                            </div>
                        }


                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' onClick={() => setModalOpen(false)}>
                            Cancel
                        </Button>
                        {cookies.get(userId)?<Button colorScheme='blue' onClick={handleRatingSubmit}>Submit</Button>:null}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
