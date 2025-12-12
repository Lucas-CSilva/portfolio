'use client';

import { TextField, InputAdornment, IconButton, Chip, Box, useTheme, alpha } from '@mui/material';
import { Search, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = 'Buscar projetos...' }: SearchInputProps) {
    const theme = useTheme();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <TextField
            inputRef={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            fullWidth
            size="medium"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Search
                            style={{
                                width: '20px',
                                height: '20px',
                                color: theme.palette.text.secondary,
                            }}
                        />
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        {value ? (
                            <IconButton
                                size="small"
                                onClick={() => onChange('')}
                                aria-label="Limpar busca"
                                sx={{
                                    p: 1,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        bgcolor: alpha(theme.palette.error.main, 0.1),
                                        color: 'error.main',
                                    },
                                }}
                            >
                                <X style={{ width: '16px', height: '16px' }} />
                            </IconButton>
                        ) : (
                            <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                                <Chip
                                    label="⌘ K"
                                    size="small"
                                    sx={{
                                        height: '26px',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        fontFamily: 'monospace',
                                        borderRadius: '6px',
                                        bgcolor: alpha(theme.palette.text.secondary, 0.08),
                                        color: 'text.secondary',
                                        border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                                    }}
                                />
                            </Box>
                        )}
                    </InputAdornment>
                ),
            }}
            sx={{
                '& .MuiInputBase-input': {
                    fontWeight: 500,
                    fontSize: '0.9375rem',
                },
                '& .MuiOutlinedInput-root': {
                    background: theme.palette.mode === 'dark'
                        ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.6)} 0%, ${alpha(theme.palette.background.paper, 0.4)} 100%)`
                        : alpha('#ffffff', 0.8),
                    backdropFilter: 'blur(20px)',
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '& fieldset': {
                        borderColor: alpha(theme.palette.divider, 0.3),
                        borderWidth: '1.5px',
                    },
                    '&:hover': {
                        '& fieldset': {
                            borderColor: alpha(theme.palette.primary.main, 0.4),
                        },
                    },
                    '&.Mui-focused': {
                        boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
                        '& fieldset': {
                            borderColor: 'primary.main',
                            borderWidth: '1.5px',
                        },
                    },
                },
            }}
        />
    );
}