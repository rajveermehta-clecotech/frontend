// src/components/profileCompletion/FileUploadField.jsx
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  Stack,
} from "@mui/material";
import {
  CloudUpload,
  Remove,
  Image,
  Check,
} from "@mui/icons-material";

const uploadButtonStyles = {
  borderRadius: 8,
  borderColor: "primary.main",
  color: "primary.main",
  py: 1,
  px: { xs: 2, sm: 3 },
  "&:hover": {
    borderColor: "primary.light",
    bgcolor: "rgba(123, 97, 255, 0.04)",
  },
  whiteSpace: "nowrap",
  transition: "all 0.2s",
};

const FileUploadField = ({
  label,
  description,
  name,
  error,
  preview,
  onChange,
  onRemove,
  uploadIcon = <CloudUpload />,
  buttonText = "Upload File",
  successText = "File uploaded successfully",
  accept = "image/*,.pdf",
  isUploading,
  dropZone = false,
  isImagePreview = false
}) => {
  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onChange(name, e.target.files[0]);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {label && (
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          {label}
        </Typography>
      )}
      
      {description && (
        <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
          {description}
        </Typography>
      )}

      {error && (
        <Typography color="error" variant="caption" sx={{ display: "block", mb: 2 }}>
          {error}
        </Typography>
      )}

      {isUploading ? (
        <Box sx={{ textAlign: "center", my: 2 }}>
          <CircularProgress size={40} sx={{ mb: 2 }} />
          <Typography variant="body2" color="text.secondary">
            Uploading file...
          </Typography>
        </Box>
      ) : !preview ? (
        dropZone ? (
          <Box
            sx={{
              border: "2px dashed",
              borderColor: "divider",
              borderRadius: 2,
              p: 3,
              width: "100%",
              textAlign: "center",
              transition: "all 0.2s",
              "&:hover": {
                borderColor: "primary.main",
                bgcolor: "rgba(123, 97, 255, 0.02)",
              },
            }}
          >
            {uploadIcon && (
              <Box component="span" sx={{ fontSize: 48, color: "text.secondary", mb: 1, display: "inline-block" }}>
                {uploadIcon}
              </Box>
            )}
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Drag and drop files here, or
            </Typography>
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUpload />}
              sx={uploadButtonStyles}
            >
              Browse Files
              <input
                type="file"
                name={name}
                accept={accept}
                hidden
                onChange={handleChange}
              />
            </Button>
          </Box>
        ) : (
          <Button
            variant="outlined"
            component="label"
            startIcon={uploadIcon}
            sx={uploadButtonStyles}
            fullWidth={dropZone}
          >
            {buttonText}
            <input
              type="file"
              name={name}
              accept={accept}
              hidden
              onChange={handleChange}
            />
          </Button>
        )
      ) : (
        <Box sx={{ width: "100%", textAlign: dropZone ? "center" : "left" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: dropZone ? "center" : "flex-start",
              gap: 2,
              mb: 2,
            }}
          >
            {isImagePreview && preview && (
              <Box
                component="img"
                src={preview}
                alt={label || "Uploaded file"}
                sx={{
                  height: 40,
                  width: 40,
                  objectFit: "contain",
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              />
            )}
            
            <Check sx={{ color: "success.main", fontSize: 24 }} />
            <Typography
              variant="body1"
              color="success.main"
              sx={{ fontWeight: 500 }}
            >
              {successText}
            </Typography>
          </Box>
          
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<Remove />}
            onClick={() => onRemove(name)}
            sx={{
              borderRadius: 8,
              py: 0.5,
            }}
          >
            Remove File
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FileUploadField;