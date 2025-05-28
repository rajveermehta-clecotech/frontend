// src/components/profileCompletion/Verification.jsx
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Badge, Check } from "@mui/icons-material";
import FileUploadField from "./FileUploadField";

// Common styles
const sectionTitleStyles = {
  color: "#2C2C2E",
  mb: 3,
  fontSize: { xs: "1.1rem", sm: "1.25rem" },
  fontWeight: 600,
};

const commonTextFieldStyles = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: 1,
    height: 56,
    width: "100%",
    transition: "all 0.2s",
  },
  "& .MuiInputLabel-root": {
    transform: "translate(14px, 16px) scale(1)",
  },
  "& .MuiInputLabel-shrink": {
    transform: "translate(14px, -6px) scale(0.75)",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(0, 0, 0, 0.23)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(0, 0, 0, 0.87)",
  },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "primary.main",
    borderWidth: 2,
  },
  "& .MuiFormHelperText-root": {
    marginLeft: 0,
  },
};

const Verification = ({
  formData,
  handleChange,
  handleBlur,
  touchedFields,
  errors,
  filePreview,
  handleFileChange,
  handleRemoveFile,
  uploadingFile,
  stepSaveSuccess,
}) => {
  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, width: "100%" }}>
      <Typography variant="h6" gutterBottom sx={sectionTitleStyles}>
        Verification Documents
      </Typography>

      {/* GST Number */}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="GSTIN"
          name="gstin"
          value={formData.gstin}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touchedFields.gstin && !!errors.gstin}
          helperText={touchedFields.gstin && errors.gstin}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Badge color="action" />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          sx={{ ...commonTextFieldStyles, mb: 3 }}
        />
      </Grid>

      {/* GST Certificate */}
      <Grid item xs={12}>
        <Card
          variant="outlined"
          sx={{
            borderRadius: 2,
            borderColor: errors.gstCertificate
              ? "error.main"
              : filePreview.gstCertificate
                ? "success.main"
                : "divider",
            borderWidth: (errors.gstCertificate || filePreview.gstCertificate) ? 2 : 1,
            boxShadow: "none",
            width: "100%",
            mb: 3,
            transition: "all 0.2s",
            "&:hover": {
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
            },
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <FileUploadField
              label="GST Certificate"
              description="Upload a valid GST certificate in PDF or image format"
              name="gstCertificate"
              error={errors.gstCertificate}
              preview={filePreview.gstCertificate}
              onChange={(name, file) => {
                const event = { target: { name, files: [file] } };
                handleFileChange(event);
              }}
              onRemove={handleRemoveFile}
              accept="image/*,.pdf"
              isUploading={uploadingFile === "gstCertificate"}
              dropZone={true}
              successText={formData.gstCertificate ? "File uploaded successfully" : "Certificate already uploaded"}
            />
          </CardContent>
        </Card>
      </Grid>

      {/* Business Proof Document */}
      <Grid item xs={12}>
        <Card
          variant="outlined"
          sx={{
            borderRadius: 2,
            borderColor: errors.businessProof
              ? "error.main"
              : filePreview.businessProof
                ? "success.main"
                : "divider",
            borderWidth: (errors.businessProof || filePreview.businessProof) ? 2 : 1,
            boxShadow: "none",
            width: "100%",
            mb: 3,
            transition: "all 0.2s",
            "&:hover": {
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
            },
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <FileUploadField
              label="Business Proof Document"
              description="Upload business registration, incorporation certificate or other proof"
              name="businessProof"
              error={errors.businessProof}
              preview={filePreview.businessProof}
              onChange={(name, file) => {
                const event = { target: { name, files: [file] } };
                handleFileChange(event);
              }}
              onRemove={handleRemoveFile}
              accept="image/*,.pdf"
              isUploading={uploadingFile === "businessProof"}
              successText={formData.businessProof ? "File uploaded" : "Document already uploaded"}
            />
          </CardContent>
        </Card>
      </Grid>
      
      {/* Show success message if step is already saved */}
      {stepSaveSuccess[2] && (
        <Box 
          sx={{ 
            mt: 3, 
            p: 2, 
            bgcolor: 'success.light', 
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Check sx={{ color: 'success.main', mr: 1 }} />
          <Typography 
            variant="body2" 
            sx={{ color: 'success.dark', fontWeight: 'medium' }}
          >
            Verification documents saved successfully. Your profile is now complete.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Verification;