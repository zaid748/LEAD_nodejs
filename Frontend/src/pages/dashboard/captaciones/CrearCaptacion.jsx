import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Textarea,
  Button,
  Select,
  Option,
  Alert,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Spinner
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { captacionesAPI } from "../../../services/api"; // Importar el servicio API

export function CrearCaptacion() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState(null);

  // Definición de las secciones/tabs del formulario
  const tabs = [
    { label: "Propietario", value: 0 },
    { label: "Propiedad", value: 1 },
    { label: "Adeudos", value: 2 },
    { label: "Datos Laborales", value: 3 },
    { label: "Referencias", value: 4 },
    { label: "Documentos", value: 5 },
    { label: "Venta", value: 6 },
  ];

  // Estado inicial del formulario (vacío)
  const defaultValues = {
    propietario: {
      nombre: "",
      telefono: "",
      correo: "",
      direccion: "",
      identificacion: "",
      nss: "",
      rfc: "",
      curp: "",
      estado_civil: "",
      conyuge: {
        nombre: "",
        telefono: "",
        nss: "",
        rfc: "",
        curp: ""
      }
    },
    propiedad: {
      tipo: "",
      direccion: {
        calle: "",
        numero: "",
        colonia: "",
        ciudad: "",
        estado: "",
        codigo_postal: "",
        manzana: "",
        lote: ""
      },
      caracteristicas: {
        m2_terreno: "",
        m2_construccion: "",
        habitaciones: "",
        baños: "",
        cocheras: "",
        descripcion: ""
      },
      imagenes: [],
      adeudos: [] // Array para almacenar los adeudos
    },
    datos_laborales: {
      empresa: "",
      direccion: "",
      telefono: "",
      area: "",
      puesto: "",
      turno: "",
      registro_patronal: "",
      antiguedad: "",
      ingresos_mensuales: ""
    },
    referencias_personales: [], // Array vacío para referencias personales
    documentos: {
      ine: null,
      curp: null,
      rfc: null,
      escrituras: null,
      predial: null,
      comprobante_domicilio: null,
      otros: []
    },
    venta: {
      precio_venta: "",
      moneda: "MXN",
      comision_venta: "",
      fecha_venta: "",
      estatus_venta: "En proceso",
      en_venta: false,
      comprador: {
        nombre: "",
        telefono: "",
        correo: "",
        direccion: ""
      },
      tipo_credito: "",
      observaciones: "",
      documentos_entregados: {
        contrato: false,
        identificacion: false, 
        constancia_credito: false
      }
    },
    captacion: {
      tipo_captacion: "Abierta",
      observaciones: ""
    },
    documentacion: {
      ine: false,
      curp: false,
      rfc: false,
      escrituras: false,
      predial_pagado: false,
      libre_gravamen: false,
      comprobante_domicilio: false
    },
    tipo_tramite: "" // Campo adicional para el tipo de trámite
  };

  // Definir el esquema de validación con yup
  const schema = yup.object().shape({
    propietario: yup.object().shape({
      nombre: yup
        .string()
        .required("El nombre del propietario es requerido")
        .min(3, "El nombre debe tener al menos 3 caracteres"),
      telefono: yup
        .string()
        .required("El teléfono es requerido")
        .matches(/^\d{10}$/, "El teléfono debe contener exactamente 10 dígitos numéricos"),
      correo: yup
        .string()
        .email("El formato del correo electrónico no es válido")
        .optional(),
      direccion: yup.string().optional(),
      identificacion: yup.string().optional(),
      nss: yup
        .string()
        .optional()
        .matches(/^\d{11}$/, "El NSS debe contener 11 dígitos numéricos"),
      rfc: yup
        .string()
        .optional()
        .matches(
          /^[A-Z&Ñ]{3,4}[0-9]{6}[A-Z0-9]{3}$/,
          "El formato de RFC no es válido (ej. ABCD123456XXX)"
        ),
      curp: yup
        .string()
        .optional()
        .matches(
          /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9A-Z]{2}$/,
          "El formato de CURP no es válido"
        ),
      estado_civil: yup
        .string()
        .required("El estado civil es requerido")
    }),
    propiedad: yup.object().shape({
      tipo: yup
        .string()
        .required("El tipo de propiedad es requerido"),
      direccion: yup.object().shape({
        calle: yup
          .string()
          .required("La calle es requerida"),
        numero: yup
          .string()
          .required("El número es requerido"),
        colonia: yup
          .string()
          .required("La colonia es requerida"),
        ciudad: yup
          .string()
          .required("La ciudad es requerida"),
        estado: yup
          .string()
          .required("El estado es requerido"),
        codigo_postal: yup
          .string()
          .required("El código postal es requerido"),
        manzana: yup
          .string()
          .transform(v => (v === '' ? 'N/A' : v))
          .optional(),
        lote: yup
          .string()
          .transform(v => (v === '' ? 'N/A' : v))
          .optional()
      }),
      caracteristicas: yup.object().shape({
        m2_terreno: yup
          .number()
          .transform((value) => (isNaN(value) ? undefined : value))
          .required("Los metros cuadrados de terreno son requeridos")
          .positive("Debe ser un número mayor a 0"),
        m2_construccion: yup
          .number()
          .transform((value) => (isNaN(value) ? undefined : value))
          .required("Los metros cuadrados de construcción son requeridos")
          .positive("Debe ser un número mayor a 0"),
        habitaciones: yup
          .number()
          .transform((value) => (isNaN(value) ? undefined : value))
          .required("El número de recámaras es requerido")
          .min(0, "No puede ser un número negativo"),
        baños: yup
          .number()
          .transform((value) => (isNaN(value) ? undefined : value))
          .required("El número de baños es requerido")
          .min(0, "No puede ser un número negativo"),
        cocheras: yup
          .number()
          .transform((value) => (isNaN(value) ? undefined : value))
          .optional()
          .min(0, "No puede ser un número negativo")
      })
    }),
    referencias_personales: yup
      .array()
      .of(
        yup.object().shape({
          nombre: yup
            .string()
            .required("El nombre es requerido")
            .min(3, "El nombre debe tener al menos 3 caracteres"),
          telefono: yup
            .string()
            .required("El teléfono es requerido")
            .matches(/^\d{10}$/, "El teléfono debe contener exactamente 10 dígitos numéricos"),
          relacion: yup
            .string()
            .required("El parentesco es requerido"),
          direccion: yup
            .string()
            .optional()
        })
      )
      .min(1, "Se requiere al menos 1 referencia personal")
      .required("Las referencias personales son requeridas"),
    // Añadir validación para documentos
    documentacion: yup.object().shape({
      ine: yup
        .boolean()
        .oneOf([true], "La identificación oficial (INE) es obligatoria")
        .required("La identificación oficial (INE) es obligatoria"),
      escrituras: yup
        .boolean()
        .oneOf([true], "Las escrituras son obligatorias")
        .required("Las escrituras son obligatorias"),
      curp: yup.boolean().optional(),
      rfc: yup.boolean().optional(),
      comprobante_domicilio: yup.boolean().optional()
    }),
    // Validación condicional para detalle de adeudo 'Otro'
    propiedad: yup.object().shape({
      adeudos: yup.array().of(yup.object().shape({
        tipo: yup.string().required(),
        detalle: yup.string().when('tipo', {
          is: 'Otro',
          then: (schema) => schema.required('Debe especificar el detalle del adeudo cuando es "Otro"')
        })
      }))
    }),
    venta: yup.object().shape({
      precio_venta: yup
        .number()
        .transform(value => (isNaN(value) || value === null || value === '' ? undefined : value))
        .nullable()
        .optional(),
      moneda: yup.string().oneOf(['MXN','USD']).optional(),
      tipo_credito: yup
        .string()
        .nullable()
        .optional(),
      en_venta: yup.boolean().default(false),
      comprador: yup.object().shape({
        nombre: yup
          .string()
          .nullable()
          .optional(),
        telefono: yup
          .string()
          .nullable()
          .optional(),
        correo: yup
          .string()
          .nullable()
          .optional(),
      }),
      documentos_entregados: yup.object().shape({
        contrato: yup.boolean().default(false),
        identificacion: yup.boolean().default(false),
        constancia_credito: yup.boolean().default(false)
      }),
      observaciones: yup.string().optional()
    }),
    captacion: yup.object().shape({
      tipo_captacion: yup
        .string()
        .required("El tipo de captación es requerido"),
      observaciones: yup.string().optional()
    }),
    datos_laborales: yup.object().shape({
      empresa: yup
        .string()
        .optional(),
      direccion: yup.string().optional(),
      telefono: yup
        .string()
        .optional(),
      area: yup
        .string()
        .optional(),
      puesto: yup
        .string()
        .optional(),
      turno: yup
        .string()
        .optional(),
      registro_patronal: yup
        .string()
        .optional(),
      antiguedad: yup
        .number()
        .transform(value => (isNaN(value) || value === null || value === '' ? undefined : value))
        .nullable()
        .optional(),
      ingresos_mensuales: yup
        .number()
        .transform(value => (isNaN(value) || value === null || value === '' ? undefined : value))
        .nullable()
        .optional()
    })
  });

  // Inicializar react-hook-form con el esquema de validación y valores por defecto
  const {
    control,
    handleSubmit: onSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    reset,
    getValues
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onChange"
  });

  const [formData, setFormData] = useState(defaultValues);
  // Nuevo estado para controlar si el formulario está completo
  const [formCompleto, setFormCompleto] = useState(false);
  // Añadir una función para generar un resumen de los errores
  const getErrorSummary = () => {
    let summary = [];
    
    if (errors.propietario) {
      const propErrors = Object.keys(errors.propietario);
      summary.push(`Propietario: ${propErrors.join(', ')}`);
    }
    
    if (errors.propiedad) {
      let propErrors = [];
      if (errors.propiedad.tipo) propErrors.push('tipo');
      if (errors.propiedad.direccion) propErrors.push('dirección');
      if (errors.propiedad.caracteristicas) propErrors.push('características');
      if (errors.propiedad.adeudos) propErrors.push('adeudos');
      summary.push(`Propiedad: ${propErrors.join(', ')}`);
    }
    
    if (errors.referencias_personales) {
      if (typeof errors.referencias_personales === 'object' && !Array.isArray(errors.referencias_personales)) {
        summary.push(`Referencias: ${errors.referencias_personales.message}`);
      } else {
        summary.push('Referencias personales: datos incompletos');
      }
    }
    
    if (errors.documentacion) {
      const docErrors = Object.keys(errors.documentacion);
      summary.push(`Documentación: ${docErrors.join(', ')}`);
    }
    
    if (errors.venta && watch('venta.en_venta')) {
      let ventaErrors = [];
      if (errors.venta.precio_venta) ventaErrors.push('precio');
      if (errors.venta.tipo_credito) ventaErrors.push('tipo de crédito');
      if (errors.venta.comprador) ventaErrors.push('datos del comprador');
      summary.push(`Venta: ${ventaErrors.join(', ')}`);
    }
    
    return summary.length > 0 ? summary : null;
  };
  // Verificar autenticación y rol
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/check-auth`, {
          credentials: 'include'
        });
        
        const data = await response.json();
        
        if (data.success) {
          setUser(data.user);
          
          // Verificar permisos
          const userRole = data.user?.role || '';
          const isAuthorized = ['user', 'administrator', 'admin'].includes(userRole);
          
          if (!isAuthorized) {
            navigate('/dashboard/home');
          }
        } else {
          navigate('/auth/sign-in');
        }
      } catch (error) {
        console.error("Error al verificar autenticación:", error);
        navigate('/auth/sign-in');
      }
    };
    
    checkAuth();
  }, [navigate]);
  // Modificar useEffect para actualizar errores
  useEffect(() => {
    // Verificar si hay errores de formulario para mostrar
    const errorSummary = getErrorSummary();
    if (errorSummary && !error) {
      setError(`Corrija los siguientes errores antes de guardar: ${errorSummary.join('; ')}`);
      
      // Hacer que el mensaje de error desaparezca automáticamente después de 5 segundos
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      
      // Limpiar el temporizador cuando el componente se desmonte o cuando cambie el error
      return () => clearTimeout(timer);
    }
    
    try {
      // Obtener valores actuales del formulario
      const valores = getValues();
      
      // Logging para depuración
      console.log("Estado actual del formulario:", {
        propietario: valores.propietario,
        propiedadDireccion: valores.propiedad?.direccion,
        propiedadCaracteristicas: valores.propiedad?.caracteristicas,
        referencias: valores.referencias_personales,
        documentacion: valores.documentacion
      });
      
      // Verificar SOLO los campos mínimos obligatorios
      const propietarioCompleto = 
        !!valores.propietario?.nombre && 
        !!valores.propietario?.telefono &&
        !!valores.propietario?.estado_civil;
      
      // Verificar campos obligatorios de la propiedad
      const propiedadCompleta = 
        !!valores.propiedad?.tipo && 
        !!valores.propiedad?.direccion?.calle &&
        !!valores.propiedad?.direccion?.numero &&
        !!valores.propiedad?.direccion?.colonia &&
        !!valores.propiedad?.direccion?.ciudad &&
        !!valores.propiedad?.direccion?.estado &&
        !!valores.propiedad?.direccion?.codigo_postal;
      
      // Verificar características básicas de la propiedad
      const caracteristicasCompletas = 
        Number(valores.propiedad?.caracteristicas?.m2_terreno) > 0 &&
        Number(valores.propiedad?.caracteristicas?.m2_construccion) > 0 &&
        valores.propiedad?.caracteristicas?.habitaciones !== undefined &&
        valores.propiedad?.caracteristicas?.baños !== undefined;
      
      // Verificar referencias personales (al menos 1)
      const referenciasCompletas = 
        Array.isArray(valores.referencias_personales) && 
        valores.referencias_personales.length >= 1 &&
        valores.referencias_personales.every(ref => 
          !!ref.nombre && 
          !!ref.telefono && 
          !!ref.relacion
        );
      
      // Verificar documentación obligatoria
      const documentacionCompleta = 
        valores.documentacion?.ine === true && 
        valores.documentacion?.escrituras === true;
      
      // La venta siempre se considera completa (no es obligatoria)
      const ventaCompleta = true;
      
      // Determinar si el formulario está completo
      const formularioCompleto = 
        propietarioCompleto && 
        propiedadCompleta && 
        caracteristicasCompletas && 
        referenciasCompletas && 
        documentacionCompleta;
      
      setFormCompleto(formularioCompleto);
      
      // Log para depuración
      console.log({
        propietarioCompleto,
        propiedadCompleta,
        caracteristicasCompletas,
        referenciasCompletas,
        documentacionCompleta,
        ventaCompleta,
        formularioCompleto
      });
    } catch (e) {
      console.error("Error al verificar completitud del formulario:", e);
      setFormCompleto(false);
    }
  }, [getValues, error, watch]);  // Añadido watch para que reaccione a cambios en los valores
  // Manejar cambios en los campos
  const handleChange = (e, section, subsection, field) => {
    const { name, value, type, checked } = e.target;
    const actualValue = type === 'checkbox' ? checked : value;
    
    if (section && subsection && field) {
      // Maneja campos anidados en 3 niveles (ej: propiedad.direccion.calle)
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [subsection]: {
            ...prev[section][subsection],
            [field]: actualValue
          }
        }
      }));
      
      // Actualizar también en react-hook-form
      setValue(`${section}.${subsection}.${field}`, actualValue);
    } else if (section && subsection) {
      // Maneja campos anidados en 2 niveles (ej: propietario.nombre)
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [subsection]: actualValue
        }
      }));
      
      // Actualizar también en react-hook-form
      setValue(`${section}.${subsection}`, actualValue);
    } else if (section) {
      // Maneja campos con 1 nivel de anidación (ej: tipo_tramite)
      setFormData(prev => ({
        ...prev,
        [section]: actualValue
      }));
      
      // Actualizar también en react-hook-form
      setValue(section, actualValue);
    } else {
      // Maneja campos directos
      setFormData(prev => ({
        ...prev,
        [name]: actualValue
      }));
      
      // Actualizar también en react-hook-form
      setValue(name, actualValue);
    }
  };
  // Manejar selección de estado civil
  const handleEstadoCivilChange = (value) => {
    setFormData(prev => ({
      ...prev,
      propietario: {
        ...prev.propietario,
        estado_civil: value
      }
    }));
    
    // Actualizar también en react-hook-form
    setValue('propietario.estado_civil', value);
  };
  // Función para manejar adeudos
  const handleAddAdeudo = () => {
    const nuevoAdeudo = { 
      tipo: "", 
      monto: "", 
      numero_referencia: "",
      descripcion: "" 
    };
    
    appendAdeudo(nuevoAdeudo);
    
    // Actualizar también formData
    setFormData(prev => ({
      ...prev,
      propiedad: {
        ...prev.propiedad,
        adeudos: [...prev.propiedad.adeudos, nuevoAdeudo]
      }
    }));
  };

  // Funciones para manejar referencias personales
  const handleAddReferencia = () => {
    const nuevaReferencia = {
      nombre: '',
      relacion: '', // Usar directamente 'relacion' como requiere el backend
      telefono: '',
      direccion: ''
    };
    
    appendReferencia(nuevaReferencia);
  };

  const handleUpdateReferencia = (index, field, value) => {
    // Usar setValue de React Hook Form en lugar de setForm
    setValue(`referencias_personales.${index}.${field}`, value);
  };
  // Guardar captación
  const submitForm = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);

      // Obtener valores del formulario usando getValues() de React Hook Form
      const formData = getValues();
      
      // Corregir la estructura para los documentos entregados
      // El backend espera 'documentos_entregados' pero tenemos 'documentacion'
      if (formData.documentacion) {
        formData.documentos_entregados = { ...formData.documentacion };
        // Eliminar el campo original para no enviar datos duplicados
        delete formData.documentacion;
      }
      
      // Mapear 'parentesco' a 'relacion' en cada referencia personal si es necesario
      if (formData.referencias_personales && formData.referencias_personales.length > 0) {
        formData.referencias_personales = formData.referencias_personales.map(referencia => {
          // Crear una copia para no modificar el original
          const referenciaActualizada = { ...referencia };
          
          // Eliminar el campo parentesco para no enviarlo al backend (ya tenemos relacion)
          if (referenciaActualizada.parentesco) {
            delete referenciaActualizada.parentesco;
          }
          
          return referenciaActualizada;
        });
      }
      
      // Asegurar fecha de captación automática si backend no la establece
      if (!formData.fecha_captacion && !formData.fechaCaptacion) {
        formData.fecha_captacion = new Date().toISOString();
      }
      
      // Continuar con el resto de la función
      console.log('Datos a enviar:', formData);
      
      // Realizar la petición al servidor
      const responseData = await captacionesAPI.create(formData);
      
      console.log("Respuesta del servidor:", responseData);
      
      // Mostrar mensaje de éxito
      setSuccessMessage("Captación guardada exitosamente");
      
      // Redirigir después de un tiempo
      setTimeout(() => {
        navigate("/dashboard/captaciones");
      }, 2000);
    } catch (apiError) {
      console.error("Error al enviar formulario:", apiError);
      
      // Manejar errores específicos de la API
      if (apiError.errores && apiError.errores.length > 0) {
        const mensajesError = apiError.errores.map(err => `${err.param}: ${err.msg}`).join('\n');
        setError(mensajesError);
      } else {
        setError(apiError.message || "Error al guardar la captación");
      }
    } finally {
      setIsLoading(false);
    }
  };
  // Configurar useFieldArray para manejar los adeudos
  const { 
    fields: adeudosFields, 
    append: appendAdeudo, 
    remove: removeAdeudo 
  } = useFieldArray({
    control,
    name: "propiedad.adeudos"
  });
  // Configurar useFieldArray para manejar las referencias personales
  const { 
    fields: referenciasFields, 
    append: appendReferencia, 
    remove: removeReferencia 
  } = useFieldArray({
    control,
    name: "referencias_personales"
  });
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography variant="h6">Cargando...</Typography>
      </div>
    );
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-4 p-6">
          <Typography variant="h6" color="white">
            Nueva Captación Inmobiliaria
          </Typography>
        </CardHeader>

        <CardBody className="p-4 md:p-6">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Registro de Captación Inmobiliaria
          </Typography>
          <Typography variant="paragraph" color="blue-gray" className="mb-6">
            Complete toda la información requerida para registrar una nueva propiedad.
            Los campos marcados con * son obligatorios.
          </Typography>

          {/* Sistema de Tabs para navegación entre secciones */}
          <Tabs value={activeTab}>
            <TabsHeader className="mb-6 flex flex-wrap md:flex-nowrap h-auto md:h-12 py-2 gap-1 bg-blue-gray-50 overflow-x-auto md:overflow-x-auto hide-scrollbar">
              {tabs.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => setActiveTab(value)}
                  className={`py-2 px-3 whitespace-nowrap rounded-md transition-all ${activeTab === value ? "bg-white shadow-sm font-medium" : ""}`}
                >
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody animate={{
              initial: { opacity: 0 },
              mount: { opacity: 1 },
              unmount: { opacity: 0 },
            }}>
              {/* Contenido de cada Tab */}
              <TabPanel value={0}>
                <Typography variant="h6" color="blue-gray" className="mb-4">
                Información del Propietario
              </Typography>
                <div className="min-h-[300px]">
                  <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                  <Controller
                    name="propietario.nombre"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        label="Nombre del Propietario *"
                        error={!!errors.propietario?.nombre}
                        value={field.value || ""}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          // También actualizar formData
                          handleChange(e, 'propietario', 'nombre');
                        }}
                      />
                    )}
                  />
                  {errors.propietario?.nombre && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.propietario.nombre.message}
                    </div>
                  )}
                </div>
                
                <div className="col-span-1">
                  <Controller
                    name="propietario.telefono"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="tel"
                        label="Teléfono *"
                        error={!!errors.propietario?.telefono}
                        value={field.value || ""}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          // También actualizar formData
                          handleChange(e, 'propietario', 'telefono');
                        }}
                      />
                    )}
                  />
                  {errors.propietario?.telefono && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.propietario.telefono.message}
                    </div>
                  )}
                </div>
                
                <div className="col-span-1">
                  <Controller
                    name="propietario.correo"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="email"
                        label="Correo Electrónico"
                        error={!!errors.propietario?.correo}
                        value={field.value || ""}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          // También actualizar formData
                          handleChange(e, 'propietario', 'correo');
                        }}
                      />
                    )}
                  />
                  {errors.propietario?.correo && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.propietario.correo.message}
                    </div>
                  )}
                </div>
                
                <div className="col-span-1">
                  <Controller
                    name="propietario.direccion"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        label="Dirección Particular"
                        value={field.value || ""}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          // También actualizar formData
                          handleChange(e, 'propietario', 'direccion');
                        }}
                      />
                    )}
                  />
                </div>
                
                <div className="col-span-1">
                  <Controller
                    name="propietario.identificacion"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        label="Identificación"
                        value={field.value || ""}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          // También actualizar formData
                          handleChange(e, 'propietario', 'identificacion');
                        }}
                      />
                    )}
                  />
                </div>
                
                <div className="col-span-1">
                  <Controller
                    name="propietario.estado_civil"
                    control={control}
                    render={({ field }) => (
                      <Select
                        label="Estado Civil *"
                        value={field.value || ""}
                        onChange={(value) => {
                          field.onChange(value);
                          // También actualizar formData
                          handleEstadoCivilChange(value);
                        }}
                        error={!!errors.propietario?.estado_civil}
                      >
                        <Option value="Soltero">Soltero(a)</Option>
                        <Option value="Casado">Casado(a)</Option>
                        <Option value="Divorciado">Divorciado(a)</Option>
                        <Option value="Viudo">Viudo(a)</Option>
                        <Option value="Unión Libre">Unión Libre</Option>
                      </Select>
                    )}
                  />
                  {errors.propietario?.estado_civil && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.propietario.estado_civil.message}
                    </div>
                  )}
                </div>
                
                <div className="col-span-1">
                  <Controller
                    name="propietario.nss"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        label="NSS"
                        error={!!errors.propietario?.nss}
                        {...field}
                      />
                    )}
                  />
                  {errors.propietario?.nss && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.propietario.nss.message}
                    </div>
                  )}
                </div>
                
                <div className="col-span-1">
                  <Controller
                    name="propietario.rfc"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        label="RFC"
                        error={!!errors.propietario?.rfc}
                        {...field}
                      />
                    )}
                  />
                  {errors.propietario?.rfc && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.propietario.rfc.message}
                    </div>
                  )}
                </div>
                
                <div className="col-span-1">
                  <Controller
                    name="propietario.curp"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        label="CURP"
                        error={!!errors.propietario?.curp}
                        {...field}
                      />
                    )}
                  />
                  {errors.propietario?.curp && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.propietario.curp.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Datos de Esposa(o) - visible solo si Estado Civil = Casado */}
              {watch('propietario.estado_civil') === 'Casado' && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <Typography variant="h6" color="green" className="mb-3">Datos de Esposa(o)</Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Controller
                    name="propietario.conyuge.nombre"
                    control={control}
                    render={({ field }) => (
                      <Input type="text" label="Nombre de Esposa(o)" value={field.value || ""} onChange={(e) => field.onChange(e.target.value)} />
                    )}
                  />
                  <Controller
                    name="propietario.conyuge.telefono"
                    control={control}
                    render={({ field }) => (
                      <Input type="tel" label="Teléfono de Esposa(o)" value={field.value || ""} onChange={(e) => field.onChange(e.target.value)} />
                    )}
                  />
                  <Controller
                    name="propietario.conyuge.nss"
                    control={control}
                    render={({ field }) => (
                      <Input type="text" label="NSS de Esposa(o)" value={field.value || ""} onChange={(e) => field.onChange(e.target.value)} />
                    )}
                  />
                  <Controller
                    name="propietario.conyuge.rfc"
                    control={control}
                    render={({ field }) => (
                      <Input type="text" label="RFC de Esposa(o)" value={field.value || ""} onChange={(e) => field.onChange(e.target.value)} />
                    )}
                  />
                  <Controller
                    name="propietario.conyuge.curp"
                    control={control}
                    render={({ field }) => (
                      <Input type="text" label="CURP de Esposa(o)" value={field.value || ""} onChange={(e) => field.onChange(e.target.value)} />
                    )}
                  />
                </div>
              </div>
              )}
            </div>
                </div>
              </TabPanel>
            
              <TabPanel value={1}>
                <Typography variant="h6" color="blue-gray" className="mb-4">
                Información de la Propiedad
              </Typography>
                <div className="min-h-[300px]">
                  <div className="mb-6">
              <div className="mb-4">
                <Controller
                  name="propiedad.tipo"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Tipo de Propiedad *"
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      error={!!errors.propiedad?.tipo}
                    >
                      <Option value="Casa">Casa</Option>
                      <Option value="Departamento">Departamento</Option>
                      <Option value="Condominio">Condominio</Option>
                      <Option value="Terreno">Terreno</Option>
                      <Option value="Local">Local</Option>
                      <Option value="Bodega">Bodega</Option>
                      <Option value="Edificio">Edificio</Option>
                    </Select>
                  )}
                />
                {errors.propiedad?.tipo && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.propiedad.tipo.message}
                  </div>
                )}
              </div>
              
                    <div className="bg-blue-50 p-4 rounded-lg mb-6">
                      <Typography variant="h6" color="blue-gray" className="mb-3">
                Dirección de la Propiedad
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                  <Controller
                    name="propiedad.direccion.calle"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        label="Calle *"
                        className="bg-white"
                        error={!!errors.propiedad?.direccion?.calle}
                        {...field}
                      />
                    )}
                  />
                  {errors.propiedad?.direccion?.calle && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.propiedad.direccion.calle.message}
                    </div>
                  )}
                </div>
                
                <div className="col-span-1">
                  <Controller
                    name="propiedad.direccion.numero"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        label="Número *"
                        className="bg-white"
                        error={!!errors.propiedad?.direccion?.numero}
                        {...field}
                      />
                    )}
                  />
                  {errors.propiedad?.direccion?.numero && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.propiedad.direccion.numero.message}
                    </div>
                  )}
                </div>
                
                <div className="col-span-1">
                  <Controller
                    name="propiedad.direccion.colonia"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        label="Colonia *"
                        className="bg-white"
                        error={!!errors.propiedad?.direccion?.colonia}
                        {...field}
                      />
                    )}
                  />
                  {errors.propiedad?.direccion?.colonia && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.propiedad.direccion.colonia.message}
                    </div>
                  )}
                </div>
                
                <div className="col-span-1">
                  <Controller
                    name="propiedad.direccion.ciudad"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        label="Ciudad *"
                        className="bg-white"
                        error={!!errors.propiedad?.direccion?.ciudad}
                        {...field}
                      />
                    )}
                  />
                  {errors.propiedad?.direccion?.ciudad && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.propiedad.direccion.ciudad.message}
                    </div>
                  )}
                </div>
                
                <div className="col-span-1">
                  <Controller
                    name="propiedad.direccion.estado"
                    control={control}
                    render={({ field }) => (
                      <Select
                        label="Estado *"
                        className="bg-white"
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                        error={!!errors.propiedad?.direccion?.estado}
                      >
                        <Option value="Aguascalientes">Aguascalientes</Option>
                        <Option value="Baja California">Baja California</Option>
                        <Option value="Baja California Sur">Baja California Sur</Option>
                        <Option value="Campeche">Campeche</Option>
                        <Option value="Chiapas">Chiapas</Option>
                        <Option value="Chihuahua">Chihuahua</Option>
                        <Option value="Ciudad de México">Ciudad de México</Option>
                        <Option value="Coahuila">Coahuila</Option>
                        <Option value="Colima">Colima</Option>
                        <Option value="Durango">Durango</Option>
                        <Option value="Estado de México">Estado de México</Option>
                        <Option value="Guanajuato">Guanajuato</Option>
                        <Option value="Guerrero">Guerrero</Option>
                        <Option value="Hidalgo">Hidalgo</Option>
                        <Option value="Jalisco">Jalisco</Option>
                        <Option value="Michoacán">Michoacán</Option>
                        <Option value="Morelos">Morelos</Option>
                        <Option value="Nayarit">Nayarit</Option>
                        <Option value="Nuevo León">Nuevo León</Option>
                        <Option value="Oaxaca">Oaxaca</Option>
                        <Option value="Puebla">Puebla</Option>
                        <Option value="Querétaro">Querétaro</Option>
                        <Option value="Quintana Roo">Quintana Roo</Option>
                        <Option value="San Luis Potosí">San Luis Potosí</Option>
                        <Option value="Sinaloa">Sinaloa</Option>
                        <Option value="Sonora">Sonora</Option>
                        <Option value="Tabasco">Tabasco</Option>
                        <Option value="Tamaulipas">Tamaulipas</Option>
                        <Option value="Tlaxcala">Tlaxcala</Option>
                        <Option value="Veracruz">Veracruz</Option>
                        <Option value="Yucatán">Yucatán</Option>
                        <Option value="Zacatecas">Zacatecas</Option>
                      </Select>
                    )}
                  />
                  {errors.propiedad?.direccion?.estado && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.propiedad.direccion.estado.message}
                    </div>
                  )}
                </div>
                
                <div className="col-span-1">
                  <Controller
                    name="propiedad.direccion.codigo_postal"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        label="Código Postal *"
                        className="bg-white"
                        error={!!errors.propiedad?.direccion?.codigo_postal}
                        {...field}
                      />
                    )}
                  />
                  {errors.propiedad?.direccion?.codigo_postal && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.propiedad.direccion.codigo_postal.message}
                    </div>
                  )}
                </div>

                <div className="col-span-1">
                  <Controller
                    name="propiedad.direccion.manzana"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        label="Manzana (opcional)"
                        placeholder="N/A"
                        className="bg-white"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    )}
                  />
                </div>
                
                <div className="col-span-1">
                  <Controller
                    name="propiedad.direccion.lote"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        label="Lote (opcional)"
                        placeholder="N/A"
                        className="bg-white"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <Typography variant="h6" color="blue-gray" className="mb-3">
                        Características Físicas
              </Typography>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="col-span-1">
                  <Controller
                    name="propiedad.caracteristicas.m2_terreno"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="number"
                        label="Terreno (m²) *"
                        className="bg-white"
                        error={!!errors.propiedad?.caracteristicas?.m2_terreno}
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? "" : Number(value));
                        }}
                      />
                    )}
                  />
                  {errors.propiedad?.caracteristicas?.m2_terreno && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.propiedad.caracteristicas.m2_terreno.message}
                    </div>
                  )}
                </div>
                
                <div className="col-span-1">
                  <Controller
                    name="propiedad.caracteristicas.m2_construccion"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="number"
                        label="Construcción (m²) *"
                        className="bg-white"
                        error={!!errors.propiedad?.caracteristicas?.m2_construccion}
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? "" : Number(value));
                        }}
                      />
                    )}
                  />
                  {errors.propiedad?.caracteristicas?.m2_construccion && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.propiedad.caracteristicas.m2_construccion.message}
                    </div>
                  )}
                </div>
                
                <div className="col-span-1">
                  <Controller
                    name="propiedad.caracteristicas.habitaciones"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="number"
                        label="Recámaras *"
                        className="bg-white"
                        error={!!errors.propiedad?.caracteristicas?.habitaciones}
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? "" : Number(value));
                        }}
                      />
                    )}
                  />
                  {errors.propiedad?.caracteristicas?.habitaciones && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.propiedad.caracteristicas.habitaciones.message}
                    </div>
                  )}
                </div>
                
                <div className="col-span-1">
                  <Controller
                    name="propiedad.caracteristicas.baños"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="number"
                        label="Baños *"
                        className="bg-white"
                        error={!!errors.propiedad?.caracteristicas?.baños}
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? "" : Number(value));
                        }}
                      />
                    )}
                  />
                  {errors.propiedad?.caracteristicas?.baños && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.propiedad.caracteristicas.baños.message}
                    </div>
                  )}
                </div>
                
                <div className="col-span-1">
                  <Controller
                    name="propiedad.caracteristicas.cocheras"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="number"
                        label="Cocheras"
                        className="bg-white"
                        error={!!errors.propiedad?.caracteristicas?.cocheras}
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? "" : Number(value));
                        }}
                      />
                    )}
                  />
                  {errors.propiedad?.caracteristicas?.cocheras && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.propiedad.caracteristicas.cocheras.message}
                    </div>
                  )}
                </div>
                
                <div className="col-span-1">
                  <Controller
                    name="propiedad.caracteristicas.año_construccion"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="number"
                        label="Año de Construcción"
                        className="bg-white"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? "" : Number(value));
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="mt-4">
                <Controller
                  name="propiedad.caracteristicas.descripcion"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      label="Descripción adicional de la propiedad"
                      className="bg-white"
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
                  </div>
                </div>
              </TabPanel>

              <TabPanel value={2}>
                <Typography variant="h6" color="blue-gray" className="mb-4">
                  Adeudos de la Propiedad
                </Typography>
                <div className="min-h-[300px]">
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <Typography variant="paragraph" color="blue-gray" className="mb-4">
                      Registre los adeudos que tiene la propiedad (predial, agua, hipotecas, etc.)
                    </Typography>
                    
                    {adeudosFields.map((field, index) => (
                      <div key={field.id} className="mb-4 p-3 border rounded bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                          <div>
                            <Controller
                              name={`propiedad.adeudos.${index}.tipo`}
                              control={control}
                              render={({ field }) => (
                                <Select
                                  label="Tipo de Adeudo *"
                                  value={field.value}
                                  onChange={(value) => field.onChange(value)}
                                  error={!!errors.propiedad?.adeudos?.[index]?.tipo}
                                >
                                  <Option value="Predial">Predial</Option>
                                  <Option value="Agua">Agua</Option>
                                  <Option value="Hipoteca">Hipoteca</Option>
                                  <Option value="CFE">CFE</Option>
                                  <Option value="Mantenimiento">Mantenimiento</Option>
                                  <Option value="Otro">Otro</Option>
                                </Select>
                              )}
                            />
                            {errors.propiedad?.adeudos?.[index]?.tipo && (
                              <div className="text-red-500 text-xs mt-1">
                                {errors.propiedad.adeudos[index].tipo.message}
                              </div>
                            )}
                          </div>
                          <div>
                            <Controller
                              name={`propiedad.adeudos.${index}.monto`}
                              control={control}
                              render={({ field }) => (
                                <Input
                                  type="number"
                                  label="Monto *"
                                  min="0"
                                  className={errors.propiedad?.adeudos?.[index]?.monto ? "border-red-500" : ""}
                                  {...field}
                                  onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                                />
                              )}
                            />
                            {errors.propiedad?.adeudos?.[index]?.monto && (
                              <div className="text-red-500 text-xs mt-1">
                                {errors.propiedad.adeudos[index].monto.message}
                              </div>
                            )}
                          </div>
                          <div>
                            <Controller
                              name={`propiedad.adeudos.${index}.numero_referencia`}
                              control={control}
                              render={({ field }) => (
                                <Input
                                  type="text"
                                  label="Número de Referencia o número de crédito *"
                                  className={errors.propiedad?.adeudos?.[index]?.numero_referencia ? "border-red-500" : ""}
                                  {...field}
                                />
                              )}
                            />
                            {errors.propiedad?.adeudos?.[index]?.numero_referencia && (
                              <div className="text-red-500 text-xs mt-1">
                                {errors.propiedad.adeudos[index].numero_referencia.message}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button
                            color="red"
                            variant="text"
                            size="sm"
                            onClick={() => removeAdeudo(index)}
                          >
                            Eliminar
                          </Button>
                        </div>
                        {/* Detalle cuando el tipo es 'Otro' */}
                        {watch(`propiedad.adeudos.${index}.tipo`) === 'Otro' && (
                          <div className="mt-3">
                            <Controller
                              name={`propiedad.adeudos.${index}.detalle`}
                              control={control}
                              render={({ field }) => (
                                <Input
                                  type="text"
                                  label="Detalle del adeudo (obligatorio si seleccionó 'Otro')"
                                  value={field.value || ''}
                                  onChange={(e) => field.onChange(e.target.value)}
                                />
                              )}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                    
                    <Button
                      className="mt-2"
                      color="blue"
                      variant="text"
                      size="sm"
                      onClick={handleAddAdeudo}
                    >
                      + Agregar Adeudo
                    </Button>
                  </div>
                </div>
              </TabPanel>

              <TabPanel value={3}>
                <Typography variant="h6" color="blue-gray" className="mb-4">
                  Datos Laborales del Propietario
                </Typography>
                <div className="min-h-[300px]">
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <Typography variant="paragraph" color="blue-gray" className="mb-4">
                      Información sobre la situación laboral del propietario
                    </Typography>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        type="text"
                        label="Empresa"
                        value={formData.datos_laborales.empresa}
                        onChange={(e) => handleChange(e, 'datos_laborales', 'empresa')}
                        className="bg-white"
                      />
                      
                      <Input
                        type="text"
                        label="Puesto"
                        value={formData.datos_laborales.puesto}
                        onChange={(e) => handleChange(e, 'datos_laborales', 'puesto')}
                        className="bg-white"
                      />
                      
                      <Input
                        type="text"
                        label="Área o Departamento"
                        value={formData.datos_laborales.area}
                        onChange={(e) => handleChange(e, 'datos_laborales', 'area')}
                        className="bg-white"
                      />
                      
                      <Input
                        type="text"
                        label="Turno"
                        value={formData.datos_laborales.turno}
                        onChange={(e) => handleChange(e, 'datos_laborales', 'turno')}
                        className="bg-white"
                      />
                      
                      <Input
                        type="text"
                        label="Registro Patronal"
                        value={formData.datos_laborales.registro_patronal}
                        onChange={(e) => handleChange(e, 'datos_laborales', 'registro_patronal')}
                        className="bg-white"
                      />
                      
                      <Input
                        type="tel"
                        label="Teléfono del Trabajo"
                        value={formData.datos_laborales.telefono}
                        onChange={(e) => handleChange(e, 'datos_laborales', 'telefono')}
                        className="bg-white"
                      />
                      
                                  <Input
                                    type="number"
                        label="Antigüedad (años)"
                        value={formData.datos_laborales.antiguedad}
                        onChange={(e) => handleChange(e, 'datos_laborales', 'antiguedad')}
                        className="bg-white"
                      />
                      
                      <Input
                        type="number"
                        label="Ingresos Mensuales"
                        value={formData.datos_laborales.ingresos_mensuales}
                        onChange={(e) => handleChange(e, 'datos_laborales', 'ingresos_mensuales')}
                        className="bg-white"
                      />
                    </div>
                    
                    <div className="mt-4">
                      <Typography variant="small" className="font-medium mb-2 text-blue-gray-500">
                        Dirección del Trabajo
                      </Typography>
                      <Textarea
                        label="Dirección completa del trabajo"
                        value={formData.datos_laborales.direccion}
                        onChange={(e) => handleChange(e, 'datos_laborales', 'direccion')}
                        className="bg-white"
                      />
                    </div>
                  </div>
                </div>
              </TabPanel>

              <TabPanel value={4}>
                <Typography variant="h6" color="blue-gray" className="mb-4">
                  Referencias Personales
                </Typography>
                <div className="min-h-[300px]">
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <Typography variant="paragraph" color="blue-gray" className="mb-4">
                      Proporcione al menos dos referencias personales que puedan validar la información del propietario
                    </Typography>
                    
                    {referenciasFields.length === 0 ? (
                      <div className="text-center p-4 bg-white rounded-lg border border-blue-gray-100">
                        <Typography variant="paragraph" color="blue-gray" className="italic">
                          No hay referencias registradas. Se requiere al menos 1 referencia.
                        </Typography>
                      </div>
                    ) : (
                      referenciasFields.map((field, index) => (
                        <div key={field.id} className="mb-4 p-4 bg-white rounded-lg border border-blue-gray-100">
                          <div className="flex justify-between items-start mb-4">
                            <Typography variant="h6" color="blue-gray">
                              Referencia #{index + 1}
                            </Typography>
                            <Button 
                              color="red" 
                              variant="text" 
                              size="sm"
                              onClick={() => removeReferencia(index)}
                            >
                              Eliminar
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Controller
                                name={`referencias_personales.${index}.nombre`}
                                control={control}
                                render={({ field }) => (
                                  <Input
                                    type="text"
                                    label="Nombre Completo *"
                                    error={!!errors.referencias_personales?.[index]?.nombre}
                                    {...field}
                                  />
                                )}
                              />
                              {errors.referencias_personales?.[index]?.nombre && (
                                <div className="text-red-500 text-xs mt-1">
                                  {errors.referencias_personales[index].nombre.message}
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <Controller
                                name={`referencias_personales.${index}.relacion`}
                                control={control}
                                render={({ field }) => (
                                  <Input
                                    label="Parentesco o Relación *"
                                    error={!!errors?.referencias_personales?.[index]?.relacion}
                                    value={field.value || ''}
                                    onChange={(e) => {
                                      field.onChange(e); // Para React Hook Form
                                      handleUpdateReferencia(index, 'relacion', e.target.value); // Para actualización adicional si es necesaria
                                    }}
                                  />
                                )}
                              />
                              {errors.referencias_personales?.[index]?.relacion && (
                                <div className="text-red-500 text-xs mt-1">
                                  {errors.referencias_personales[index].relacion.message}
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <Controller
                                name={`referencias_personales.${index}.telefono`}
                                control={control}
                                render={({ field }) => (
                                  <Input
                                    type="tel"
                                    label="Teléfono de Contacto *"
                                    error={!!errors.referencias_personales?.[index]?.telefono}
                                    {...field}
                                  />
                                )}
                              />
                              {errors.referencias_personales?.[index]?.telefono && (
                                <div className="text-red-500 text-xs mt-1">
                                  {errors.referencias_personales[index].telefono.message}
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <Controller
                                name={`referencias_personales.${index}.direccion`}
                                control={control}
                                render={({ field }) => (
                                  <Input
                                    type="text"
                                    label="Dirección"
                                    {...field}
                                  />
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                    
                    {errors.referencias_personales && !Array.isArray(errors.referencias_personales) && (
                      <div className="text-red-500 text-sm mt-1 mb-3 font-medium">
                        {errors.referencias_personales.message}
                      </div>
                    )}
                    
                    <div className="mt-4 flex justify-center">
                      <Button 
                        variant="filled" 
                        color="blue" 
                        className="flex items-center gap-2"
                        onClick={handleAddReferencia}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Agregar Referencia
                      </Button>
                    </div>
                  </div>
                </div>
              </TabPanel>

              <TabPanel value={5}>
                <Typography variant="h6" color="blue-gray" className="mb-4">
                  Documentos Requeridos
                </Typography>
                <div className="min-h-[300px]">
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <Typography variant="paragraph" color="blue-gray" className="mb-4">
                      Marque los documentos que ha recibido del propietario.
                      <span className="text-red-500 font-medium"> Los documentos marcados con * son obligatorios.</span>
                    </Typography>
                    
                    <div className="bg-white p-5 rounded-lg border border-blue-gray-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Controller
                            name="documentacion.ine"
                            control={control}
                            defaultValue={false}
                            render={({ field }) => (
                              <div className="flex items-center">
                                <label htmlFor="ine-check" className="flex items-center cursor-pointer">
                                  <input
                                    id="ine-check"
                                    type="checkbox"
                                    className={`w-5 h-5 mr-3 ${errors.documentacion?.ine ? 'border-red-500' : ''}`}
                                    checked={field.value === true}
                                    onChange={(e) => {
                                      field.onChange(e.target.checked);
                                      // También actualizar formData
                                      setFormData(prev => ({
                                        ...prev,
                                        documentacion: {
                                          ...prev.documentacion,
                                          ine: e.target.checked
                                        }
                                      }));
                                    }}
                                  />
                                  <span className="font-medium">Identificación oficial (INE) *</span>
                                </label>
                              </div>
                            )}
                          />
                          {errors.documentacion?.ine && (
                            <div className="text-red-500 text-xs ml-8 mt-1">
                              {errors.documentacion.ine.message}
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <Controller
                            name="documentacion.escrituras"
                            control={control}
                            defaultValue={false}
                            render={({ field }) => (
                              <div className="flex items-center">
                                <label htmlFor="escrituras-check" className="flex items-center cursor-pointer">
                                  <input
                                    id="escrituras-check"
                                    type="checkbox"
                                    className={`w-5 h-5 mr-3 ${errors.documentacion?.escrituras ? 'border-red-500' : ''}`}
                                    checked={field.value === true}
                                    onChange={(e) => {
                                      field.onChange(e.target.checked);
                                      // También actualizar formData
                                      setFormData(prev => ({
                                        ...prev,
                                        documentacion: {
                                          ...prev.documentacion,
                                          escrituras: e.target.checked
                                        }
                                      }));
                                    }}
                                  />
                                  <span className="font-medium">Escrituras *</span>
                                </label>
                              </div>
                            )}
                          />
                          {errors.documentacion?.escrituras && (
                            <div className="text-red-500 text-xs ml-8 mt-1">
                              {errors.documentacion.escrituras.message}
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <Controller
                            name="documentacion.curp"
                            control={control}
                            render={({ field }) => (
                              <div className="flex items-center">
                                <label htmlFor="curp-check" className="flex items-center cursor-pointer">
                                  <input
                                    id="curp-check"
                                    type="checkbox"
                                    className="w-5 h-5 mr-3"
                                    checked={field.value}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                  />
                                  <span className="font-medium">CURP</span>
                                </label>
                              </div>
                            )}
                          />
                        </div>
                        
                        <div>
                          <Controller
                            name="documentacion.rfc"
                            control={control}
                            render={({ field }) => (
                              <div className="flex items-center">
                                <label htmlFor="rfc-check" className="flex items-center cursor-pointer">
                                  <input
                                    id="rfc-check"
                                    type="checkbox"
                                    className="w-5 h-5 mr-3"
                                    checked={field.value}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                  />
                                  <span className="font-medium">RFC</span>
                                </label>
                              </div>
                            )}
                          />
                        </div>
                        
                        <div>
                          <Controller
                            name="documentacion.comprobante_domicilio"
                            control={control}
                            render={({ field }) => (
                              <div className="flex items-center">
                                <label htmlFor="comprobante-check" className="flex items-center cursor-pointer">
                                  <input
                                    id="comprobante-check"
                                    type="checkbox"
                                    className="w-5 h-5 mr-3"
                                    checked={field.value}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                  />
                                  <span className="font-medium">Comprobante de Domicilio</span>
                                </label>
                              </div>
                            )}
                          />
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Typography variant="h6" color="blue-gray" className="mb-2">
                          Observaciones sobre documentación
                        </Typography>
                        <Controller
                          name="documentacion.observaciones"
                          control={control}
                          render={({ field }) => (
                            <Textarea
                              label="Notas adicionales sobre los documentos"
                              className="bg-white"
                              {...field}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>

              <TabPanel value={6}>
                <Typography variant="h6" color="blue-gray" className="mb-4">
                  Información de Venta
                </Typography>
                <div className="min-h-[300px]">
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <div className="mb-4">
                      <Controller
                        name="venta.en_venta"
                        control={control}
                        render={({ field }) => (
                          <div className="flex items-center mb-4">
                            <label htmlFor="en-venta-check" className="flex items-center cursor-pointer">
                              <input
                                id="en-venta-check"
                                type="checkbox"
                                className="w-5 h-5 mr-3"
                                checked={field.value}
                                onChange={(e) => field.onChange(e.target.checked)}
                              />
                              <span className="font-medium text-lg">¿La propiedad está en venta?</span>
                            </label>
                          </div>
                        )}
                      />
                    </div>

                    {watch("venta.en_venta") && (
                      <>
                        {/* Datos generales de venta */}
                        <div className="mb-4 bg-white p-4 rounded-lg border border-blue-gray-100">
                          <Typography variant="h6" color="blue-gray" className="mb-3">
                            Datos de la Operación
                          </Typography>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Controller
                                name="venta.precio_venta"
                                control={control}
                                render={({ field }) => (
                                  <Input
                                    type="number"
                                    label="Precio de Venta *"
                                    className="bg-white"
                                    error={!!errors.venta?.precio_venta}
                                    {...field}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      field.onChange(value === "" ? "" : Number(value));
                                    }}
                                  />
                                )}
                              />
                              {errors.venta?.precio_venta && (
                                <div className="text-red-500 text-xs mt-1">
                                  {errors.venta.precio_venta.message}
                                </div>
                              )}
                            </div>
                            <div>
                              <Controller
                                name="venta.moneda"
                                control={control}
                                render={({ field }) => (
                                  <Select
                                    label="Moneda"
                                    value={field.value || 'MXN'}
                                    onChange={(value) => field.onChange(value)}
                                  >
                                    <Option value="MXN">MXN (Pesos)</Option>
                                    <Option value="USD">USD (Dólares)</Option>
                                  </Select>
                                )}
                              />
                            </div>
                            
                            <div>
                              <Controller
                                name="venta.comision_venta"
                                control={control}
                                render={({ field }) => (
                                  <Input
                                    type="number"
                                    label="Comisión de Venta"
                                    className="bg-white"
                                    {...field}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      field.onChange(value === "" ? "" : Number(value));
                                    }}
                                  />
                                )}
                              />
                            </div>
                            
                            <div>
                              <Controller
                                name="venta.fecha_venta"
                                control={control}
                                render={({ field }) => (
                                  <Input
                                    type="date"
                                    label="Fecha de Venta"
                                    className="bg-white"
                                    {...field}
                                  />
                                )}
                              />
                            </div>
                            
                            <div>
                              <Controller
                                name="venta.tipo_credito"
                                control={control}
                                render={({ field }) => (
                                  <Select
                                    label="Tipo de Crédito *"
                                    className="bg-white"
                                    value={field.value}
                                    onChange={(value) => field.onChange(value)}
                                    error={!!errors.venta?.tipo_credito}
                                  >
                                    <Option value="Contado">Contado</Option>
                                    <Option value="INFONAVIT">INFONAVIT</Option>
                                    <Option value="Crédito Bancario">Crédito Bancario</Option>
                                  </Select>
                                )}
                              />
                              {errors.venta?.tipo_credito && (
                                <div className="text-red-500 text-xs mt-1">
                                  {errors.venta.tipo_credito.message}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Datos del comprador */}
                        <div className="mb-4 bg-white p-4 rounded-lg border border-blue-gray-100">
                          <Typography variant="h6" color="blue-gray" className="mb-3">
                            Datos del Comprador
                          </Typography>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Controller
                                name="venta.comprador.nombre"
                                control={control}
                                render={({ field }) => (
                                  <Input
                                    type="text"
                                    label="Nombre del Comprador *"
                                    className="bg-white"
                                    error={!!errors.venta?.comprador?.nombre}
                                    {...field}
                                  />
                                )}
                              />
                              {errors.venta?.comprador?.nombre && (
                                <div className="text-red-500 text-xs mt-1">
                                  {errors.venta.comprador.nombre.message}
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <Controller
                                name="venta.comprador.telefono"
                                control={control}
                                render={({ field }) => (
                                  <Input
                                    type="tel"
                                    label="Teléfono del Comprador *"
                                    className="bg-white"
                                    error={!!errors.venta?.comprador?.telefono}
                                    {...field}
                                  />
                                )}
                              />
                              {errors.venta?.comprador?.telefono && (
                                <div className="text-red-500 text-xs mt-1">
                                  {errors.venta.comprador.telefono.message}
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <Controller
                                name="venta.comprador.correo"
                                control={control}
                                render={({ field }) => (
                                  <Input
                                    type="email"
                                    label="Correo Electrónico"
                                    className="bg-white"
                                    error={!!errors.venta?.comprador?.correo}
                                    {...field}
                                  />
                                )}
                              />
                              {errors.venta?.comprador?.correo && (
                                <div className="text-red-500 text-xs mt-1">
                                  {errors.venta.comprador.correo.message}
                                </div>
                              )}
                            </div>
                          
                            <div>
                              <Controller
                                name="venta.comprador.direccion"
                                control={control}
                                render={({ field }) => (
                                  <Input
                                    type="text"
                                    label="Dirección"
                                    className="bg-white"
                                    {...field}
                                  />
                                )}
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* Documentos de venta (con checkboxes) */}
                        <div className="mb-4 bg-white p-4 rounded-lg border border-blue-gray-100">
                          <Typography variant="h6" color="blue-gray" className="mb-3">
                            Documentos de la Venta
                          </Typography>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Controller
                                name="venta.documentos_entregados.contrato"
                                control={control}
                                render={({ field }) => (
                                  <div className="flex items-center">
                                    <label htmlFor="contrato-check" className="flex items-center cursor-pointer">
                                      <input
                                        id="contrato-check"
                                        type="checkbox"
                                        className="w-5 h-5 mr-3"
                                        checked={field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                      />
                                      <span className="font-medium">Contrato de Compraventa</span>
                                    </label>
                                  </div>
                                )}
                              />
                            </div>
                            
                            <div>
                              <Controller
                                name="venta.documentos_entregados.identificacion"
                                control={control}
                                render={({ field }) => (
                                  <div className="flex items-center">
                                    <label htmlFor="identificacion-check" className="flex items-center cursor-pointer">
                                      <input
                                        id="identificacion-check"
                                        type="checkbox"
                                        className="w-5 h-5 mr-3"
                                        checked={field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                      />
                                      <span className="font-medium">Identificación del Comprador</span>
                                    </label>
                                  </div>
                                )}
                              />
                            </div>
                            
                            <div>
                              <Controller
                                name="venta.documentos_entregados.constancia_credito"
                                control={control}
                                render={({ field }) => (
                                  <div className="flex items-center">
                                    <label htmlFor="credito-check" className="flex items-center cursor-pointer">
                                      <input
                                        id="credito-check"
                                        type="checkbox"
                                        className="w-5 h-5 mr-3"
                                        checked={field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                      />
                                      <span className="font-medium">Constancia/Aprobación de Crédito</span>
                                    </label>
                                  </div>
                                )}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Observaciones */}
                        <div className="bg-white p-4 rounded-lg border border-blue-gray-100">
                          <Typography variant="h6" color="blue-gray" className="mb-3">
                            Observaciones de la Venta
                          </Typography>
                          <Controller
                            name="venta.observaciones"
                            control={control}
                            render={({ field }) => (
                              <Textarea
                                label="Notas o comentarios adicionales sobre la venta"
                                className="bg-white"
                                {...field}
                              />
                            )}
                          />
                        </div>
                      </>
                    )}
                    
                    {!watch("venta.en_venta") && (
                      <div className="text-center p-4 bg-white rounded-lg border border-blue-gray-100">
                        <Typography variant="paragraph" color="blue-gray" className="italic">
                          La propiedad no está en venta actualmente.
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>

        <CardFooter className="flex justify-between p-4">
          <Button 
            variant="outlined" 
            color="red" 
            onClick={() => navigate("/dashboard/captaciones")}
          >
            Cancelar
          </Button>

          <Button 
            variant="filled" 
            color="green" 
            onClick={submitForm}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" />
                <span>Guardando...</span>
              </div>
            ) : "Guardar Captación"}
          </Button>
        </CardFooter>
        
        {/* Mostrar errores */}
        {error && (
          <div className="px-4 pb-4 animate-fade-in">
            <Alert 
              color="red" 
              variant="filled" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75a1.5 1.5 0 01-1.5 1.5 1.5 0 01-1.5-1.5 1.5 0 011.5-1.5z" />
                </svg>
              }
              onClose={() => setError(null)}
              animate={{
                mount: { y: 0, opacity: 1 },
                unmount: { y: 25, opacity: 0 },
              }}
            >
              {error}
            </Alert>
          </div>
        )}
        
        {/* Mostrar mensaje de éxito */}
        {successMessage && (
          <div className="px-4 pb-4">
            <Alert 
              color="green" 
              variant="filled" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              onClose={() => setSuccessMessage("")}
            >
              {successMessage}
            </Alert>
          </div>
        )}
      </Card>
    </div>
  );
}

export default CrearCaptacion; 