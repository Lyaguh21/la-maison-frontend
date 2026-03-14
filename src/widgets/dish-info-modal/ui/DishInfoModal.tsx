import {
  selectOpenedDishInfoModal,
  selectSelectedDish,
  setOpenDishInfoModal,
} from "@/entities/view";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { DishCard } from "@/widgets/dish-card";
import { Modal } from "@mantine/core";

export default function DishInfoModal() {
  const dispatch = useAppDispatch();
  const openedDishInfoModal = useAppSelector(selectOpenedDishInfoModal);
  const selectedDish = useAppSelector(selectSelectedDish);

  const handleClose = () => {
    dispatch(setOpenDishInfoModal(false));
  };

  return (
    <Modal
      onClose={handleClose}
      opened={openedDishInfoModal}
      title={selectedDish?.name}
      size="xl"
    >
      <DishCard visibleType="list" dish={selectedDish} />
    </Modal>
  );
}
