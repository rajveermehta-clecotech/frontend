// src/components/profileCompletion/DocumentUpload.jsx
import {
    Box,
    Typography,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
  } from "@mui/material";
  import { 
    Description as DocumentIcon,
    CloudUpload as UploadIcon,
    Schedule as ClockIcon,
    CheckCircle as CheckIcon,
  } from "@mui/icons-material";
  
  const DocumentUpload = ({
    formData,
    handleFileChange,
    filePreview,
  }) => {
    const documents = [
      {
        key: "businessRegistration",
        title: "Business Registration Certificate",
        required: true,
      },
      {
        key: "taxId",
        title: "Tax Identification Number",
        required: true,
      },
      {
        key: "tradeLicense",
        title: "Trade License",
        required: false,
      },
      {
        key: "gstRegistration",
        title: "GST Registration",
        required: false,
      },
      {
        key: "bankStatement",
        title: "Bank Statement",
        required: false,
      },
    ];
  
    const handleFileUpload = (documentKey) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.pdf,.jpg,.jpeg,.png';
      input.onchange = (e) => {
        if (e.target.files[0]) {
          handleFileChange(documentKey, e.target.files[0]);
        }
      };
      input.click();
    };
  
    const uploadedCount = Object.values(formData.documents).filter(doc => doc !== null).length;
  
    return (
      <Box>
        {/* Step Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <DocumentIcon sx={{ color: "#4A90E2", mr: 2, fontSize: 24 }} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#1A202C",
                fontSize: "1.5rem",
              }}
            >
              Step 3: Documents
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: "#718096",
              fontSize: "1rem",
            }}
          >
            Upload verification documents
          </Typography>
        </Box>
  
        {/* Upload Instructions */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: "#2D3748",
              mb: 1,
              fontSize: "1.1rem",
            }}
          >
            Upload Required Documents
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#718096",
              fontSize: "0.9rem",
            }}
          >
            Please upload at least 2 documents for verification
          </Typography>
        </Box>
  
        {/* Document List */}
        <Box sx={{ mb: 4 }}>
          <List sx={{ padding: 0 }}>
            {documents.map((doc, index) => {
              const isUploaded = formData.documents[doc.key] !== null;
              
              return (
                <ListItem
                  key={doc.key}
                  sx={{
                    border: "1px solid #E2E8F0",
                    borderRadius: 2,
                    mb: 2,
                    bgcolor: "white",
                    "&:hover": {
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    },
                    px: 3,
                    py: 2,
                  }}
                >
                  <ListItemIcon>
                    {isUploaded ? (
                      <CheckIcon sx={{ color: "#48BB78", fontSize: 24 }} />
                    ) : (
                      <ClockIcon sx={{ color: "#CBD5E0", fontSize: 24 }} />
                    )}
                  </ListItemIcon>
                  
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 500,
                          color: "#2D3748",
                          fontSize: "1rem",
                        }}
                      >
                        {doc.title}
                      </Typography>
                    }
                  />
                  
                  <ListItemSecondaryAction>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<UploadIcon />}
                      onClick={() => handleFileUpload(doc.key)}
                      disabled={isUploaded}
                      sx={{
                        borderColor: isUploaded ? "#48BB78" : "#4A90E2",
                        color: isUploaded ? "#48BB78" : "#4A90E2",
                        fontWeight: 500,
                        px: 2,
                        py: 0.5,
                        "&:hover": {
                          borderColor: isUploaded ? "#38A169" : "#3182CE",
                          backgroundColor: "transparent",
                        },
                        "&.Mui-disabled": {
                          borderColor: "#48BB78",
                          color: "#48BB78",
                        },
                      }}
                    >
                      {isUploaded ? "Uploaded" : "Upload"}
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
  
          {/* Upload Progress */}
          <Box
            sx={{
              mt: 3,
              p: 3,
              bgcolor: "#F7FAFC",
              borderRadius: 2,
              border: "1px solid #E2E8F0",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#4A5568",
                fontSize: "0.9rem",
                textAlign: "center",
              }}
            >
              {uploadedCount} of {documents.length} documents uploaded
              {uploadedCount >= 2 && (
                <Typography
                  component="span"
                  sx={{
                    color: "#48BB78",
                    fontWeight: 600,
                    ml: 1,
                  }}
                >
                  ✓ Minimum requirement met
                </Typography>
              )}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default DocumentUpload;