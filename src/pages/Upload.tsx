import { useState } from 'react';
import { Form, Link } from 'react-router-dom';
import InputError from '@/components/InputError';
import { UploadErrors } from '@/types/UploadTypes';
import axios from '@/lib/axios';
import UploadForm from '@/components/UploadForm';

const games = [
	{ id: 0, name: 'skyrim' },
	{ id: 1, name: 'fallout' },
];

function Upload() {
	return <UploadForm games={games} />;
}
export default Upload;
