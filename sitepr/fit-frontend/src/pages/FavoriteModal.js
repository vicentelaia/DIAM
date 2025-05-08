import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import FavoriteForm from './FavoriteForm';

function FavoriteModal({ recipe, isOpen, toggle }) {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Guardar Receita como Favorita</ModalHeader>
      <ModalBody>
        <FavoriteForm recipeId={recipe.id} toggle={toggle} />
      </ModalBody>
    </Modal>
  );
}

export default FavoriteModal;
