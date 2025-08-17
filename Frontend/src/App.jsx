import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { ProtectedRoute } from "./ProtectedRoute";
import { AuthProvider, useAuth } from './context/AuthContext';
import { Spinner } from "@material-tailwind/react";
import { TestCORS } from "./pages/TestCORS";

const AuthLoader = ({ children }) => {
  const { loading, authChecked } = useAuth();
  
  if (loading && !authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Spinner className="h-12 w-12 mx-auto" />
          <p className="mt-2">Cargando aplicación...</p>
        </div>
      </div>
    );
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <AuthLoader>
        <Routes>
          {/* Ruta pública para pruebas de CORS */}
          <Route path="/test-cors" element={<TestCORS />} />
          
          <Route 
            path="/dashboard/*" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/auth/*" element={<Auth />} />
          
          <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
        </Routes>
      </AuthLoader>
    </AuthProvider>
  );
}

export default App;
