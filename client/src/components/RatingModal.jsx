import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";

const RatingModal = ({ movieId, onRequestClose }) => {
  const { isOpen: isModalOpen, onOpen: openModal, onClose: closeModal } =
    useDisclosure();
  const [rating, setRating] = useState(null);

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleSubmit = () => {
    // Handle submit logic
    closeModal();
  };

  return (
    <>
      <Button onClick={openModal}>Give Your Rating</Button>
      <Modal isOpen={isModalOpen} onClose={closeModal} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Give Your Rating</ModalHeader>
          <ModalBody>
            <form>
              <label>
                Rating:
                <input type="number" min="1" max="10" onChange={handleRatingChange} />
              </label>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Submit
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RatingModal;
