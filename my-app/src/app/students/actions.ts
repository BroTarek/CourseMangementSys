'use server'

import { Student, StudentFormData } from './types';
import axios from 'axios';

// Ensure this ENV var is set in your .env.local
const API_URL = process.env.BACKEND_API_URL || 'http://localhost:5000';

export async function getStudents(search?: string, grade?: string) {
    try {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (grade && grade !== 'all') params.append('grade', grade);

        const res = await axios.get(`${API_URL}/api/students`, { params });
        return res.data;
    } catch (error) {
        console.error('Failed to fetch students:', error);
        return { success: false, data: [] };
    }
}

export async function createStudent(data: StudentFormData) {
    try {
        const res = await axios.post(`${API_URL}/api/students`, data);
        return { success: true, data: res.data.data };
    } catch (error: any) {
        return {
            success: false,
            error: error.response?.data?.error || 'Failed to create student'
        };
    }
}

export async function updateStudent(id: string, data: StudentFormData) {
    try {
        const res = await axios.put(`${API_URL}/api/students/${id}`, data);
        return { success: true, data: res.data.data };
    } catch (error: any) {
        return {
            success: false,
            error: error.response?.data?.error || 'Failed to update student'
        };
    }
}

export async function deleteStudent(id: string) {
    try {
        await axios.delete(`${API_URL}/api/students/${id}`);
        return { success: true };
    } catch (error: any) {
        return {
            success: false,
            error: error.response?.data?.error || 'Failed to delete student'
        };
    }
}
