// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addTodoAsync } from '../redux/todoSlice';
// import { Box, TextField, Button, Snackbar, Alert } from "@mui/material";

// const AddTodoForm = () => {
//     const [value, setValue] = useState('');
//     const [success, setSuccess] = useState(false);
//     const dispatch = useDispatch();
//     const token = useSelector((state) => state.user?.token);
//     if (!token) {
//         return <p>Loading...</p>;  // Or show nothing while token loads
//     }

//     const onSubmit = (event) => {
//         event.preventDefault();

//         if (!value.trim()) return; // ✅ Prevents adding empty todos

//         if (!token) {
//             alert("You must be logged in to add a todo!");
//             return;
//         }

//         dispatch(addTodoAsync({ title: value.trim() }))
//             .unwrap()
//             .then(() => {
//                 setValue(''); // ✅ Clears input after adding
//                 setSuccess(true); // ✅ Shows success message
//             })
//             .catch((error) => console.error("❌ Error adding todo:", error));
//     };

//     return (
//         <>
//             <Box
//                 component="form"
//                 onSubmit={onSubmit}
//                 sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 2,
//                     alignItems: "center",
//                     backgroundColor: "#f9f9f9",
//                     padding: 3,
//                     borderRadius: "8px",
//                     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//                     border: "1px solid #ddd",
//                     maxWidth: "500px",
//                     mx: "auto",
//                     mt: 3,
//                 }}
//             >
//                 <TextField
//                     id="todoInput"
//                     label="Add Todo"
//                     variant="outlined"
//                     fullWidth
//                     value={value}
//                     onChange={(event) => setValue(event.target.value)}
//                     sx={{
//                         backgroundColor: "white",
//                         borderRadius: "5px",
//                     }}
//                 />

//                 <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     sx={{ width: "100%" }}
//                     disabled={!value.trim()} // ✅ Disables button if input is empty
//                 >
//                     Submit
//                 </Button>
//             </Box>

//             {/* ✅ Success Snackbar Notification */}
//             <Snackbar
//                 open={success}
//                 autoHideDuration={2000}
//                 onClose={() => setSuccess(false)}
//                 anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//             >
//                 <Alert onClose={() => setSuccess(false)} severity="success">
//                     Todo Added Successfully!
//                 </Alert>
//             </Snackbar>
//         </>
//     );
// };

// export default AddTodoForm;



import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoAsync } from '../redux/todoSlice';
import { Box, TextField, Button, Snackbar, Alert } from "@mui/material";

const AddTodoForm = () => {
    const [value, setValue] = useState('');
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();

    // ✅ Ensure you're accessing the correct state path
    const token = useSelector((state) => state.user?.token);

    if (!token) {
        console.warn("⚠️ Token is missing, waiting for Redux to update...");
        return <p>Loading...</p>;  // ✅ Prevents crash while token loads
    }

    const onSubmit = (event) => {
        event.preventDefault();
    
        if (!value.trim()) return; // ✅ Prevents adding empty todos
    
        if (!token) {
            console.error("❌ Cannot add todo: Token is missing!");
            alert("You must be logged in to add a todo!");
            return;
        }
    
        console.log("🚀 Dispatching addTodoAsync with:", { title: value.trim(), token });
    
        dispatch(addTodoAsync({ title: value.trim(), token }))
            .unwrap()
            .then(() => {
                setValue(''); // ✅ Clears input after adding
                setSuccess(true); // ✅ Shows success message
            })
            .catch((error) => console.error("❌ Error adding todo:", error));
    };
    
    
    return (
        <>
            <Box
                component="form"
                onSubmit={onSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    alignItems: "center",
                    backgroundColor: "#f9f9f9",
                    padding: 3,
                    borderRadius: "8px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #ddd",
                    maxWidth: "500px",
                    mx: "auto",
                    mt: 3,
                }}
            >
                <TextField
                    id="todoInput"
                    label="Add Todo"
                    variant="outlined"
                    fullWidth
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    sx={{
                        backgroundColor: "white",
                        borderRadius: "5px",
                    }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ width: "100%" }}
                    disabled={!value.trim()} // ✅ Disables button if input is empty
                >
                    Submit
                </Button>
            </Box>

            {/* ✅ Success Snackbar Notification */}
            <Snackbar
                open={success}
                autoHideDuration={2000}
                onClose={() => setSuccess(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={() => setSuccess(false)} severity="success">
                    Todo Added Successfully!
                </Alert>
            </Snackbar>
        </>
    );
};

export default AddTodoForm;
