import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, Card, CardContent } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const DeleteModal = ({
  isModalOpen,
  handleCloseModal,
  handleDelete,
  item,
  selectedModal,
}) => {
  return (
    <Modal
      open={isModalOpen && selectedModal === item._id}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card style={style}>
        <CardContent>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you wanna delete {`'${item.title}'`}?
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <Button
              color="error"
              onClick={() => {
                handleDelete(item._id);
                handleCloseModal();
              }}
            >
              Delete
            </Button>
            <Button color="primary" onClick={() => handleCloseModal()}>
              Cancel
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default DeleteModal;
