import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import css from './App.module.css';
import Navigation from '../Navigation/Navigation';

export default function App() {
  return (
    <div>
      <Navigation />
    </div>
  );
}
