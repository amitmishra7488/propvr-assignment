import React, { useEffect, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Box, ModalCloseButton, Button } from '@chakra-ui/react';
import '../Style/capsule.css';
import Pagination from './Pagination';
import axios from 'axios';
import Cookies from 'universal-cookie'
import { useToast } from '@chakra-ui/react'
export default function Capsules() {
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
            const res = await fetch('http://localhost:8080/movies');
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
        setSelectedId(id);
        setSelectedTitle(Title);
        setModalOpen(true);
    };

    const handleRatingSubmit = async () => {
        if (rating < 1) {
            return alert("Please select a rating");
        }
        try {
            const res = await axios.put('http://localhost:8080/movies/rating',
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
        console.log(postId, cookies.get('userId'))
        try {
            const res = await axios.delete('http://localhost:8080/movies/removeRating', {
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
            console.log(cookies.get('userId'))
            toast({
                title: "Something went wrong " + cookies.get('token'),
                position: 'top',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    return (
        <>
            <div className='capsule-container'>
                <div className='capsules-card-container'>
                    <div className='capsules-card'>
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
                            'Loading.....'
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
                        <p>Selected Movie : {selectedtitle}</p>
                        {/* Add your rating input fields here */}
                        <div>
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


                    </ModalBody>
                    <ModalFooter>
                        <Button variant='ghost' onClick={() => setModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue' onClick={handleRatingSubmit}>Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
