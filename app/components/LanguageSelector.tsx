import { FormControl, Select, MenuItem, SelectChangeEvent, styled } from "@mui/material";
import { Extension } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { ReactNode } from "react";

// Define language options
export type ProgrammingLanguage = {
  name: string;
  value: string;
  extension: () => Extension;
  commentStart: string;
  commentEnd: string;
};

export const LANGUAGES: ProgrammingLanguage[] = [
  { 
    name: "JavaScript", 
    value: "javascript", 
    extension: () => javascript(), 
    commentStart: "/*", 
    commentEnd: "*/" 
  },
  { 
    name: "TypeScript", 
    value: "typescript", 
    extension: () => javascript({ typescript: true }), 
    commentStart: "/*", 
    commentEnd: "*/" 
  },
  { 
    name: "Python", 
    value: "python", 
    extension: () => python(), 
    commentStart: "'''", 
    commentEnd: "'''" 
  },
  { 
    name: "Java", 
    value: "java", 
    extension: () => java(), 
    commentStart: "/*", 
    commentEnd: "*/" 
  },
  { 
    name: "C/C++", 
    value: "cpp", 
    extension: () => cpp(), 
    commentStart: "/*", 
    commentEnd: "*/" 
  },
  { 
    name: "C#", 
    value: "csharp", 
    extension: () => cpp(), // Using C++ extension for C# as it's similar enough for syntax highlighting
    commentStart: "/*", 
    commentEnd: "*/" 
  },
];

// Styled Select component for better visibility
const StyledSelect = styled(Select<string>)(({ theme }) => ({
  height: 36,
  fontSize: "0.9rem",
  fontWeight: 500,
  color: "rgb(229, 231, 235)", // text-gray-200
  backgroundColor: "rgba(31, 41, 55, 0.5)", // bg-gray-800 with opacity
  borderRadius: "6px",
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
  transition: "all 0.2s ease",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(96, 165, 250, 0.3)", // blue-400 with opacity
  },
  "&:hover": {
    backgroundColor: "rgba(31, 41, 55, 0.7)",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(96, 165, 250, 0.7)",
    },
  },
  "&.Mui-focused": {
    backgroundColor: "rgba(31, 41, 55, 0.8)",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(96, 165, 250)",
      borderWidth: "2px",
    },
  },
  "& .MuiSelect-icon": {
    color: "rgb(96, 165, 250)", // text-blue-400
  },
}));

// Styled MenuItem for dropdown options
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: "0.9rem",
  "&.Mui-selected": {
    backgroundColor: "rgba(96, 165, 250, 0.1)",
    "&:hover": {
      backgroundColor: "rgba(96, 165, 250, 0.2)",
    },
  },
  "&:hover": {
    backgroundColor: "rgba(96, 165, 250, 0.05)",
  },
}));

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: ProgrammingLanguage) => void;
}

export function LanguageSelector({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  const handleChange = (event: SelectChangeEvent<string>, child: ReactNode) => {
    const selectedLang = LANGUAGES.find(lang => lang.value === event.target.value);
    if (selectedLang) {
      onLanguageChange(selectedLang);
    }
  };

  return (
    <FormControl size="small" sx={{ minWidth: 180 }}>
      <StyledSelect
        value={selectedLanguage}
        onChange={handleChange}
        displayEmpty
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: "rgb(31, 41, 55)", // bg-gray-800
              color: "rgb(229, 231, 235)", // text-gray-200
              borderRadius: "6px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
            },
          },
        }}
      >
        {LANGUAGES.map((lang) => (
          <StyledMenuItem key={lang.value} value={lang.value}>
            {lang.name}
          </StyledMenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
} 