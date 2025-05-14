import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import RecipeDetailData from './RecipeDetailData';

function RecipeDetailModal({ recipe, isOpen, toggle }) {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{recipe.nome}</ModalHeader>
      <ModalBody>
        <RecipeDetailData recipe={recipe} />
      </ModalBody>
    </Modal>
  );
}

export default RecipeDetailModal;
