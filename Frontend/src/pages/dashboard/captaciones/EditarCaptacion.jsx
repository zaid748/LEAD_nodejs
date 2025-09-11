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
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { captacionesAPI } from "../../../services/api";
import axios from 'axios';

export function EditarCaptacion() {
  console.log("=== COMPONENTE EditarCaptacion EJECUTÁNDOSE ===");
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener el ID de la URL
  console.log("ID de la URL:", id);
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState(null);
  const [initialData, setInitialData] = useState(null);
  const [supervisores, setSupervisores] = useState([]);


  // Definición de las secciones/tabs del formulario
  const tabs = [
    { label: "Propietario", value: 0 },
    { label: "Propiedad", value: 1 },
    { label: "Adeudos", value: 2 },
    { label: "Datos Laborales", value: 3 },
    { label: "Referencias", value: 4 },
    { label: "Documentos", value: 5 },
    { label: "Venta", value: 6 },
    { label: "Estatus y Configuración", value: 7 },
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
      tiene_conyuge: false,
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
      adeudos: []
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
    referencias_personales: [],
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
      estatus_actual: "Captación",
      presupuesto_estimado: "",
      supervisor_id: "",
      
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
    tipo_tramite: ""
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
        .required("El estado civil es requerido"),
      tiene_conyuge: yup.boolean().optional(),
      conyuge: yup.object().shape({
        nombre: yup.string().optional(),
        telefono: yup.string().optional(),
        nss: yup.string().optional(),
        rfc: yup.string().optional(),
        curp: yup.string().optional()
      })
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
        manzana: yup.string().transform(v => (v === '' ? 'N/A' : v)).optional(),
        lote: yup.string().transform(v => (v === '' ? 'N/A' : v)).optional()
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
         .optional(),
       estatus_actual: yup
         .string()
         .required("El estatus actual es requerido"),
       presupuesto_estimado: yup
         .number()
         .transform(value => (isNaN(value) || value === null || value === '' ? undefined : value))
         .nullable()
         .when('estatus_actual', (estatus_actual, schema) => {
           return estatus_actual === 'Remodelacion' 
             ? schema.required('El presupuesto estimado es requerido cuando el estatus es Remodelacion').min(0, 'El presupuesto debe ser mayor o igual a 0')
             : schema.nullable().optional();
         }),
       supervisor_id: yup
         .string()
         .nullable()
         .when('estatus_actual', (estatus_actual, schema) => {
           return estatus_actual === 'Remodelacion' 
             ? schema.required('El supervisor es requerido cuando el estatus es Remodelacion')
             : schema.nullable().optional();
         }),
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
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues
  });

  const { fields: adeudosFields, append: appendAdeudo, remove: removeAdeudo } = useFieldArray({
    control,
    name: "propiedad.adeudos"
  });

  const { fields: referenciasFields, append: appendReferencia, remove: removeReferencia } = useFieldArray({
    control,
    name: "referencias_personales"
  });



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

  // Cargar datos iniciales
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        const data = await captacionesAPI.getById(id);
        console.log("Datos recibidos:", data);
        console.log("Propietario:", data.propietario);
        console.log("Propiedad:", data.propiedad);
        console.log("Venta:", data.venta);
        console.log("Documentos:", data.documentos_entregados);
        console.log("🔍 Datos de remodelacion:", data.remodelacion);
        console.log("🔍 Supervisor en remodelacion:", data.remodelacion?.supervisor);
        console.log("🔍 Supervisor ID en remodelacion:", data.remodelacion?.supervisor_id);
        
        // Mapear los datos a la estructura del formulario, solo incluyendo los campos que existen
        const formData = {
          propietario: {
            nombre: data.propietario?.nombre || "",
            telefono: data.propietario?.telefono || "",
            correo: data.propietario?.correo || "",
            direccion: data.propietario?.direccion || "",
            identificacion: data.propietario?.identificacion || "",
            nss: data.propietario?.nss || "",
            rfc: data.propietario?.rfc || "",
            curp: data.propietario?.curp || "",
            estado_civil: data.propietario?.estado_civil || "",
            tiene_conyuge: data.propietario?.tiene_conyuge || false,
            conyuge: data.propietario?.conyuge || {
              nombre: "",
              telefono: "",
              nss: "",
              rfc: "",
              curp: ""
            }
          },
          propiedad: {
            tipo: data.propiedad?.tipo || "",
            direccion: {
              calle: data.propiedad?.direccion?.calle || "",
              numero: data.propiedad?.direccion?.numero || "",
              colonia: data.propiedad?.direccion?.colonia || "",
              ciudad: data.propiedad?.direccion?.ciudad || "",
              estado: data.propiedad?.direccion?.estado || "",
              codigo_postal: data.propiedad?.direccion?.codigo_postal || "",
              manzana: data.propiedad?.direccion?.manzana || "",
              lote: data.propiedad?.direccion?.lote || ""
            },
            caracteristicas: {
              m2_terreno: data.propiedad?.caracteristicas?.m2_terreno || "",
              m2_construccion: data.propiedad?.caracteristicas?.m2_construccion || "",
              habitaciones: data.propiedad?.caracteristicas?.habitaciones || "",
              baños: data.propiedad?.caracteristicas?.baños || "",
              cocheras: data.propiedad?.caracteristicas?.cocheras || "",
              descripcion: data.propiedad?.caracteristicas?.descripcion || ""
            },
            adeudos: data.propiedad?.adeudos || []
          },
          datos_laborales: data.datos_laborales ? {
            empresa: data.datos_laborales.empresa || "",
            direccion: data.datos_laborales.direccion || "",
            telefono: data.datos_laborales.telefono || "",
            area: data.datos_laborales.area || "",
            puesto: data.datos_laborales.puesto || "",
            turno: data.datos_laborales.turno || "",
            registro_patronal: data.datos_laborales.registro_patronal || "",
            antiguedad: data.datos_laborales.antiguedad || "",
            ingresos_mensuales: data.datos_laborales.ingresos_mensuales || ""
          } : defaultValues.datos_laborales,
          referencias_personales: data.referencias_personales || [],
          venta: data.venta ? {
            precio_venta: data.venta.monto_venta || data.venta.precio_venta || "",
            comision_venta: data.venta.comision_total || data.venta.comision_venta || "",
            fecha_venta: data.venta.fecha_venta || "",
            en_venta: data.estatus_actual === "Disponible para venta" || false,
            moneda: data.venta.moneda || "MXN",
            comprador: data.venta.comprador ? {
              nombre: data.venta.comprador.nombre || "",
              telefono: data.venta.comprador.telefono || "",
              correo: data.venta.comprador.correo || "",
              direccion: data.venta.comprador.direccion || ""
            } : defaultValues.venta.comprador,
            tipo_credito: data.venta.tipo_de_pago || data.venta.tipo_credito || "",
            observaciones: data.venta.notas_adicionales || data.venta.observaciones || "",
            documentos_entregados: data.venta.documentos_entregados ? {
              contrato: data.venta.documentos_entregados.contrato || false,
              identificacion: data.venta.documentos_entregados.identificacion || false,
              constancia_credito: data.venta.documentos_entregados.constancia_credito || false
            } : defaultValues.venta.documentos_entregados
          } : defaultValues.venta,
          captacion: data.captacion ? {
            tipo_captacion: data.captacion.tipo_captacion || "Abierta",
            estatus_actual: data.estatus_actual || "Captación",
            presupuesto_estimado: data.remodelacion?.presupuesto_estimado || "",
            supervisor_id: (() => {
              // Asegurar que solo se guarde el _id, no el objeto completo
              let supervisorId = "";
              
              if (data.remodelacion?.supervisor) {
                // Si viene como objeto, extraer solo el _id
                supervisorId = typeof data.remodelacion.supervisor === 'object' 
                  ? data.remodelacion.supervisor._id 
                  : data.remodelacion.supervisor;
              } else if (data.remodelacion?.supervisor_id) {
                // Si viene como string directo
                supervisorId = data.remodelacion.supervisor_id;
              }
              
              console.log("🔍 Mapeando supervisor_id:", supervisorId);
              console.log("🔍 De supervisor object:", data.remodelacion?.supervisor);
              console.log("🔍 De supervisor_id directo:", data.remodelacion?.supervisor_id);
              return supervisorId;
            })(),
            observaciones: data.captacion.observaciones || ""
          } : defaultValues.captacion,
          documentacion: data.documentos_entregados ? {
            ine: data.documentos_entregados.ine || false,
            curp: data.documentos_entregados.curp || false,
            rfc: data.documentos_entregados.rfc || false,
            escrituras: data.documentos_entregados.escrituras || false,
            predial_pagado: data.documentos_entregados.predial_pagado || false,
            libre_gravamen: data.documentos_entregados.libre_gravamen || false,
            comprobante_domicilio: data.documentos_entregados.comprobante_domicilio || false
          } : defaultValues.documentacion
        };

        console.log("Datos mapeados:", formData);
        setInitialData(formData);
        reset(formData);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        setError("Error al cargar los datos de la captación");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadInitialData();
    }
  }, [id, reset]);

  // Cargar supervisores disponibles
  useEffect(() => {
    const cargarSupervisores = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_URL || '';
        const response = await axios.get(`${apiBase}/api/users`, {
          params: { role: 'supervisor' },
          withCredentials: true
        });
        
        console.log('🔍 Respuesta de supervisores:', response.data);
        
        if (response.data && response.data.success && Array.isArray(response.data.users)) {
          console.log('✅ Supervisores encontrados:', response.data.users);
          setSupervisores(response.data.users);
        } else {
          console.log('❌ No se encontraron supervisores o formato incorrecto');
          setSupervisores([]);
        }
      } catch (error) {
        console.error('Error al cargar supervisores:', error);
        setSupervisores([]);
      }
    };

    cargarSupervisores();
  }, []);



  // Función para sincronizar estatus
  const sincronizarEstatus = (data) => {
    const estatusActual = data.captacion?.estatus_actual;
    
    // Si el estatus general es "Disponible para venta", activar en_venta
    if (estatusActual === "Disponible para venta") {
      data.venta = data.venta || {};
      data.venta.en_venta = true;
    }
    
    return data;
  };

  const onSubmit = async (data) => {
    try {
      console.log("=== INICIANDO ENVÍO DEL FORMULARIO ===");
      console.log("Datos del formulario a enviar:", data);
      console.log("ID de la captación:", id);
      
      // Sincronizar estatus antes de enviar
      const datosSincronizados = sincronizarEstatus(data);
      console.log("Datos sincronizados:", datosSincronizados);

      // No adjuntamos ultima_actualizacion aquí: el backend la establece con req.user y fecha.
      
      setIsLoading(true);
      setError(null);
      
      console.log("Llamando a captacionesAPI.update...");
      const response = await captacionesAPI.update(id, datosSincronizados);
      console.log("Respuesta del servidor:", response);
      
      setSuccessMessage("Captación actualizada exitosamente");
      setTimeout(() => {
        navigate("/dashboard/captaciones");
      }, 2000);
    } catch (error) {
      console.error("=== ERROR AL ACTUALIZAR ===");
      console.error("Error completo:", error);
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);
      setError(error.message || "Error al actualizar la captación");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !initialData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
        <Typography variant="h6" color="white">
          Editar Captación
        </Typography>
      </CardHeader>
      <CardBody className="px-0 pt-0 pb-2">
        <form onSubmit={handleSubmit((data) => {
          console.log("=== FORMULARIO ENVIADO ===");
          console.log("Datos del formulario:", data);
          onSubmit(data);
        })} className="mt-12 mb-2">
          <Tabs value={activeTab} className="w-full">
            <TabsHeader
              className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
              indicatorProps={{
                className: "bg-transparent border-b-2 border-blue-500 shadow-none rounded-none",
              }}
            >
              {tabs.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => setActiveTab(value)}
                  className={activeTab === value ? "text-blue-500" : ""}
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
              {/* Tab Propietario */}
              <TabPanel value={0}>
                <Typography variant="h6" color="blue-gray" className="mb-4">
                  Información del Propietario
                </Typography>
                <div className="min-h-[300px]">
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <Typography variant="paragraph" color="blue-gray" className="mb-4">
                      Complete la información personal del propietario de la propiedad.
                      Los campos marcados con * son obligatorios.
                    </Typography>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Controller
                        name="propietario.nombre"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="text"
                            label="Nombre Completo *"
                            className={errors.propietario?.nombre ? "border-red-500" : ""}
                            {...field}
                          />
                        )}
                      />
                      {errors.propietario?.nombre && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors.propietario.nombre.message}
                        </div>
                      )}
                      
                      <Controller
                        name="propietario.telefono"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="tel"
                            label="Teléfono *"
                            className={errors.propietario?.telefono ? "border-red-500" : ""}
                            {...field}
                          />
                        )}
                      />
                      {errors.propietario?.telefono && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors.propietario.telefono.message}
                        </div>
                      )}
                      
                      <Controller
                        name="propietario.correo"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="email"
                            label="Correo Electrónico"
                            className={errors.propietario?.correo ? "border-red-500" : ""}
                            {...field}
                          />
                        )}
                      />
                      {errors.propietario?.correo && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors.propietario.correo.message}
                        </div>
                      )}
                      
                      <Controller
                        name="propietario.estado_civil"
                        control={control}
                        render={({ field }) => (
                          <Select
                            label="Estado Civil *"
                            value={field.value}
                            onChange={(value) => field.onChange(value)}
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

                    {/* Datos de Esposa(o) - visible solo si Casado */}
                    {watch('propietario.estado_civil') === 'Casado' && (
                      <div className="mt-6 p-4 bg-green-50 rounded-lg">
                        <Typography variant="h6" color="green" className="mb-3">Datos de Esposa(o)</Typography>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <Controller name="propietario.conyuge.nombre" control={control} render={({ field }) => (
                            <Input type="text" label="Nombre de Esposa(o)" {...field} />)} />
                          <Controller name="propietario.conyuge.telefono" control={control} render={({ field }) => (
                            <Input type="tel" label="Teléfono de Esposa(o)" {...field} />)} />
                          <Controller name="propietario.conyuge.nss" control={control} render={({ field }) => (
                            <Input type="text" label="NSS de Esposa(o)" {...field} />)} />
                          <Controller name="propietario.conyuge.rfc" control={control} render={({ field }) => (
                            <Input type="text" label="RFC de Esposa(o)" {...field} />)} />
                          <Controller name="propietario.conyuge.curp" control={control} render={({ field }) => (
                            <Input type="text" label="CURP de Esposa(o)" {...field} />)} />
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-4">
                      <Typography variant="small" className="font-medium mb-2 text-blue-gray-500">
                        Documentos de Identificación
                      </Typography>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Controller
                          name="propietario.identificacion"
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="text"
                              label="Número de Identificación"
                              {...field}
                            />
                          )}
                        />
                        
                        <Controller
                          name="propietario.nss"
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="text"
                              label="Número de Seguridad Social"
                              className={errors.propietario?.nss ? "border-red-500" : ""}
                              {...field}
                            />
                          )}
                        />
                        {errors.propietario?.nss && (
                          <div className="text-red-500 text-xs mt-1">
                            {errors.propietario.nss.message}
                          </div>
                        )}
                        
                        <Controller
                          name="propietario.rfc"
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="text"
                              label="RFC"
                              className={errors.propietario?.rfc ? "border-red-500" : ""}
                              {...field}
                            />
                          )}
                        />
                        {errors.propietario?.rfc && (
                          <div className="text-red-500 text-xs mt-1">
                            {errors.propietario.rfc.message}
                          </div>
                        )}
                        
                        <Controller
                          name="propietario.curp"
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="text"
                              label="CURP"
                              className={errors.propietario?.curp ? "border-red-500" : ""}
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
                    
                    <div className="mt-4">
                      <Typography variant="small" className="font-medium mb-2 text-blue-gray-500">
                        Dirección del Propietario
                      </Typography>
                      <Controller
                        name="propietario.direccion"
                        control={control}
                        render={({ field }) => (
                          <Textarea
                            label="Dirección completa"
                            {...field}
                          />
                        )}
                      />
                    </div>

                    {watch('propietario.estado_civil') === 'Casado' && (
                      <div className="mt-4">
                        <Typography variant="h6" color="blue-gray" className="mb-4">
                          Información del Conyuge
                        </Typography>
                        <div className="bg-blue-50 p-4 rounded-lg mb-6">
                          <Typography variant="paragraph" color="blue-gray" className="mb-4">
                            Complete la información del conyuge del propietario.
                          </Typography>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Controller
                              name="propietario.conyuge.nombre"
                              control={control}
                              render={({ field }) => (
                                <Input
                                  type="text"
                                  label="Nombre Completo del Conyuge"
                                  {...field}
                                />
                              )}
                            />
                            {errors.propietario?.conyuge?.nombre && (
                              <div className="text-red-500 text-xs mt-1">
                                {errors.propietario.conyuge.nombre.message}
                              </div>
                            )}

                            <Controller
                              name="propietario.conyuge.telefono"
                              control={control}
                              render={({ field }) => (
                                <Input
                                  type="tel"
                                  label="Teléfono del Conyuge"
                                  {...field}
                                />
                              )}
                            />
                            {errors.propietario?.conyuge?.telefono && (
                              <div className="text-red-500 text-xs mt-1">
                                {errors.propietario.conyuge.telefono.message}
                              </div>
                            )}

                            <Controller
                              name="propietario.conyuge.nss"
                              control={control}
                              render={({ field }) => (
                                <Input
                                  type="text"
                                  label="Número de Seguridad Social del Conyuge"
                                  {...field}
                                />
                              )}
                            />
                            {errors.propietario?.conyuge?.nss && (
                              <div className="text-red-500 text-xs mt-1">
                                {errors.propietario.conyuge.nss.message}
                              </div>
                            )}

                            <Controller
                              name="propietario.conyuge.rfc"
                              control={control}
                              render={({ field }) => (
                                <Input
                                  type="text"
                                  label="RFC del Conyuge"
                                  {...field}
                                />
                              )}
                            />
                            {errors.propietario?.conyuge?.rfc && (
                              <div className="text-red-500 text-xs mt-1">
                                {errors.propietario.conyuge.rfc.message}
                              </div>
                            )}

                            <Controller
                              name="propietario.conyuge.curp"
                              control={control}
                              render={({ field }) => (
                                <Input
                                  type="text"
                                  label="CURP del Conyuge"
                                  {...field}
                                />
                              )}
                            />
                            {errors.propietario?.conyuge?.curp && (
                              <div className="text-red-500 text-xs mt-1">
                                {errors.propietario.conyuge.curp.message}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabPanel>

              {/* Tab Propiedad */}
              <TabPanel value={1}>
                <Typography variant="h6" color="blue-gray" className="mb-4">
                  Información de la Propiedad
                </Typography>
                <div className="min-h-[300px]">
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <Typography variant="paragraph" color="blue-gray" className="mb-4">
                      Complete la información de la propiedad.
                      Los campos marcados con * son obligatorios.
                    </Typography>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <Option value="Terreno">Terreno</Option>
                            <Option value="Condominio">Condominio</Option>
                            <Option value="Local Comercial">Local Comercial</Option>
                            <Option value="Oficina">Oficina</Option>
                            <Option value="Condominio">Condominio</Option>
                          </Select>
                        )}
                      />
                      {errors.propiedad?.tipo && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors.propiedad.tipo.message}
                        </div>
                      )}
                    </div>

                    <div className="mt-4">
                      <Typography variant="small" className="font-medium mb-2 text-blue-gray-500">
                        Dirección de la Propiedad
                      </Typography>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Controller
                          name="propiedad.direccion.calle"
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="text"
                              label="Calle *"
                              className={errors.propiedad?.direccion?.calle ? "border-red-500" : ""}
                              {...field}
                            />
                          )}
                        />
                        {errors.propiedad?.direccion?.calle && (
                          <div className="text-red-500 text-xs mt-1">
                            {errors.propiedad.direccion.calle.message}
                          </div>
                        )}

                        <Controller
                          name="propiedad.direccion.numero"
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="text"
                              label="Número *"
                              className={errors.propiedad?.direccion?.numero ? "border-red-500" : ""}
                              {...field}
                            />
                          )}
                        />
                        {errors.propiedad?.direccion?.numero && (
                          <div className="text-red-500 text-xs mt-1">
                            {errors.propiedad.direccion.numero.message}
                          </div>
                        )}

                        <Controller
                          name="propiedad.direccion.colonia"
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="text"
                              label="Colonia *"
                              className={errors.propiedad?.direccion?.colonia ? "border-red-500" : ""}
                              {...field}
                            />
                          )}
                        />
                        {errors.propiedad?.direccion?.colonia && (
                          <div className="text-red-500 text-xs mt-1">
                            {errors.propiedad.direccion.colonia.message}
                          </div>
                        )}

                        <Controller
                          name="propiedad.direccion.ciudad"
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="text"
                              label="Ciudad *"
                              className={errors.propiedad?.direccion?.ciudad ? "border-red-500" : ""}
                              {...field}
                            />
                          )}
                        />
                        {errors.propiedad?.direccion?.ciudad && (
                          <div className="text-red-500 text-xs mt-1">
                            {errors.propiedad.direccion.ciudad.message}
                          </div>
                        )}

                        <Controller
                          name="propiedad.direccion.estado"
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="text"
                              label="Estado *"
                              className={errors.propiedad?.direccion?.estado ? "border-red-500" : ""}
                              {...field}
                            />
                          )}
                        />
                        {errors.propiedad?.direccion?.estado && (
                          <div className="text-red-500 text-xs mt-1">
                            {errors.propiedad.direccion.estado.message}
                          </div>
                        )}

                        <Controller
                          name="propiedad.direccion.codigo_postal"
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="text"
                              label="Código Postal *"
                              className={errors.propiedad?.direccion?.codigo_postal ? "border-red-500" : ""}
                              {...field}
                            />
                          )}
                        />
                        {errors.propiedad?.direccion?.codigo_postal && (
                          <div className="text-red-500 text-xs mt-1">
                            {errors.propiedad.direccion.codigo_postal.message}
                          </div>
                        )}

                        <Controller
                          name="propiedad.direccion.manzana"
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="text"
                              label="Manzana"
                              {...field}
                            />
                          )}
                        />
                        {errors.propiedad?.direccion?.manzana && (
                          <div className="text-red-500 text-xs mt-1">
                            {errors.propiedad.direccion.manzana.message}
                          </div>
                        )}

                        <Controller
                          name="propiedad.direccion.lote"
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="text"
                              label="Lote"
                              {...field}
                            />
                          )}
                        />
                        {errors.propiedad?.direccion?.lote && (
                          <div className="text-red-500 text-xs mt-1">
                            {errors.propiedad.direccion.lote.message}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <Typography variant="small" className="font-medium mb-2 text-blue-gray-500">
                        Características de la Propiedad
                      </Typography>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Controller
                          name="propiedad.caracteristicas.m2_terreno"
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="number"
                              label="Metros Cuadrados de Terreno *"
                              className={errors.propiedad?.caracteristicas?.m2_terreno ? "border-red-500" : ""}
                              {...field}
                            />
                          )}
                        />
                        {errors.propiedad?.caracteristicas?.m2_terreno && (
                          <div className="text-red-500 text-xs mt-1">
                            {errors.propiedad.caracteristicas.m2_terreno.message}
                          </div>
                        )}

                        <Controller
                          name="propiedad.caracteristicas.m2_construccion"
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="number"
                              label="Metros Cuadrados de Construcción *"
                              className={errors.propiedad?.caracteristicas?.m2_construccion ? "border-red-500" : ""}
                              {...field}
                            />
                          )}
                        />
                        {errors.propiedad?.caracteristicas?.m2_construccion && (
                          <div className="text-red-500 text-xs mt-1">
                            {errors.propiedad.caracteristicas.m2_construccion.message}
                          </div>
                        )}

                        <Controller
                          name="propiedad.caracteristicas.habitaciones"
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="number"
                              label="Número de Recámaras *"
                              className={errors.propiedad?.caracteristicas?.habitaciones ? "border-red-500" : ""}
                              {...field}
                            />
                          )}
                        />
                        {errors.propiedad?.caracteristicas?.habitaciones && (
                          <div className="text-red-500 text-xs mt-1">
                            {errors.propiedad.caracteristicas.habitaciones.message}
                          </div>
                        )}

                        <Controller
                          name="propiedad.caracteristicas.baños"
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="number"
                              label="Número de Baños *"
                              className={errors.propiedad?.caracteristicas?.baños ? "border-red-500" : ""}
                              {...field}
                            />
                          )}
                        />
                        {errors.propiedad?.caracteristicas?.baños && (
                          <div className="text-red-500 text-xs mt-1">
                            {errors.propiedad.caracteristicas.baños.message}
                          </div>
                        )}

                        <Controller
                          name="propiedad.caracteristicas.cocheras"
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="number"
                              label="Número de Cocheras"
                              className={errors.propiedad?.caracteristicas?.cocheras ? "border-red-500" : ""}
                              {...field}
                            />
                          )}
                        />
                        {errors.propiedad?.caracteristicas?.cocheras && (
                          <div className="text-red-500 text-xs mt-1">
                            {errors.propiedad.caracteristicas.cocheras.message}
                          </div>
                        )}
                      </div>

                      <div className="mt-4">
                        <Controller
                          name="propiedad.caracteristicas.descripcion"
                          control={control}
                          render={({ field }) => (
                            <Textarea
                              label="Descripción Adicional"
                              {...field}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>

              {/* Tab Adeudos */}
              <TabPanel value={2}>
                <Typography variant="h6" color="blue-gray" className="mb-4">
                  Adeudos de la Propiedad
                </Typography>
                <div className="min-h-[300px]">
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <Typography variant="paragraph" color="blue-gray" className="mb-4">
                      Registre los adeudos relacionados con la propiedad.
                    </Typography>

                    {adeudosFields.map((field, index) => (
                      <div key={field.id} className="mb-4 p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <Typography variant="small" className="font-medium">
                            Adeudo {index + 1}
                          </Typography>
                          <Button
                            size="sm"
                            color="red"
                            variant="text"
                            onClick={() => removeAdeudo(index)}
                          >
                            Eliminar
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Controller
                            name={`propiedad.adeudos.${index}.tipo`}
                            control={control}
                            render={({ field }) => (
                              <Select
                                label="Tipo de Adeudo"
                                value={field.value}
                                onChange={(value) => field.onChange(value)}
                              >
                                <Option value="Predial">Predial</Option>
                                <Option value="Agua">Agua</Option>
                                <Option value="Hipoteca">Hipoteca</Option>
                                <Option value="CFE">CFE (Luz)</Option>
                                <Option value="Mantenimiento">Mantenimiento</Option>
                                <Option value="Gas">Gas</Option>
                                <Option value="Otro">Otro</Option>
                              </Select>
                            )}
                          />

                          <Controller
                            name={`propiedad.adeudos.${index}.monto`}
                            control={control}
                            render={({ field }) => (
                              <Input
                                type="number"
                                label="Monto"
                                {...field}
                              />
                            )}
                          />

                          <Controller
                            name={`propiedad.adeudos.${index}.numero_referencia`}
                            control={control}
                            render={({ field }) => (
                              <Input
                                type="text"
                                label="Número de Referencia o número de crédito"
                                {...field}
                              />
                            )}
                          />
                          {watch(`propiedad.adeudos.${index}.tipo`) === 'Otro' && (
                            <Controller
                              name={`propiedad.adeudos.${index}.detalle`}
                              control={control}
                              render={({ field }) => (
                                <Input
                                  type="text"
                                  label="Detalle del adeudo (si seleccionó 'Otro')"
                                  {...field}
                                />
                              )}
                            />
                          )}
                        </div>
                      </div>
                    ))}

                    <Button
                      size="sm"
                      color="blue"
                      variant="outlined"
                      onClick={() => appendAdeudo({ tipo: "", monto: "", numero_referencia: "" })}
                      className="mt-4"
                    >
                      Agregar Adeudo
                    </Button>
                  </div>
                </div>
              </TabPanel>

              {/* Tab Datos Laborales */}
              <TabPanel value={3}>
                <Typography variant="h6" color="blue-gray" className="mb-4">
                  Datos Laborales del Propietario
                </Typography>
                <div className="min-h-[300px]">
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <Typography variant="paragraph" color="blue-gray" className="mb-4">
                      Complete la información laboral del propietario.
                    </Typography>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Controller
                        name="datos_laborales.empresa"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="text"
                            label="Nombre de la Empresa"
                            {...field}
                          />
                        )}
                      />

                      <Controller
                        name="datos_laborales.direccion"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="text"
                            label="Dirección de la Empresa"
                            {...field}
                          />
                        )}
                      />

                      <Controller
                        name="datos_laborales.telefono"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="tel"
                            label="Teléfono de la Empresa"
                            {...field}
                          />
                        )}
                      />

                      <Controller
                        name="datos_laborales.area"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="text"
                            label="Área o Departamento"
                            {...field}
                          />
                        )}
                      />

                      <Controller
                        name="datos_laborales.puesto"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="text"
                            label="Puesto"
                            {...field}
                          />
                        )}
                      />

                      <Controller
                        name="datos_laborales.turno"
                        control={control}
                        render={({ field }) => (
                          <Select
                            label="Turno"
                            value={field.value}
                            onChange={(value) => field.onChange(value)}
                          >
                            <Option value="Matutino">Matutino</Option>
                            <Option value="Vespertino">Vespertino</Option>
                            <Option value="Nocturno">Nocturno</Option>
                            <Option value="Mixto">Mixto</Option>
                          </Select>
                        )}
                      />

                      <Controller
                        name="datos_laborales.registro_patronal"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="text"
                            label="Registro Patronal"
                            {...field}
                          />
                        )}
                      />

                      <Controller
                        name="datos_laborales.antiguedad"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="text"
                            label="Antigüedad"
                            {...field}
                          />
                        )}
                      />

                      <Controller
                        name="datos_laborales.ingresos_mensuales"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="number"
                            label="Ingresos Mensuales"
                            {...field}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              </TabPanel>

              {/* Tab Referencias */}
              <TabPanel value={4}>
                <Typography variant="h6" color="blue-gray" className="mb-4">
                  Referencias Personales
                </Typography>
                <div className="min-h-[300px]">
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <Typography variant="paragraph" color="blue-gray" className="mb-4">
                      Agregue al menos dos referencias personales del propietario.
                    </Typography>

                    {referenciasFields.map((field, index) => (
                      <div key={field.id} className="mb-4 p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <Typography variant="small" className="font-medium">
                            Referencia {index + 1}
                          </Typography>
                          <Button
                            size="sm"
                            color="red"
                            variant="text"
                            onClick={() => removeReferencia(index)}
                          >
                            Eliminar
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Controller
                            name={`referencias_personales.${index}.nombre`}
                            control={control}
                            render={({ field }) => (
                              <Input
                                type="text"
                                label="Nombre Completo *"
                                className={errors.referencias_personales?.[index]?.nombre ? "border-red-500" : ""}
                                {...field}
                              />
                            )}
                          />
                          {errors.referencias_personales?.[index]?.nombre && (
                            <div className="text-red-500 text-xs mt-1">
                              {errors.referencias_personales[index].nombre.message}
                            </div>
                          )}

                          <Controller
                            name={`referencias_personales.${index}.telefono`}
                            control={control}
                            render={({ field }) => (
                              <Input
                                type="tel"
                                label="Teléfono *"
                                className={errors.referencias_personales?.[index]?.telefono ? "border-red-500" : ""}
                                {...field}
                              />
                            )}
                          />
                          {errors.referencias_personales?.[index]?.telefono && (
                            <div className="text-red-500 text-xs mt-1">
                              {errors.referencias_personales[index].telefono.message}
                            </div>
                          )}

                          <Controller
                            name={`referencias_personales.${index}.relacion`}
                            control={control}
                            render={({ field }) => (
                              <Select
                                label="Parentesco *"
                                value={field.value}
                                onChange={(value) => field.onChange(value)}
                                error={!!errors.referencias_personales?.[index]?.relacion}
                              >
                                <Option value="">Seleccionar parentesco</Option>
                                <Option value="Familiar">Familiar</Option>
                                <Option value="Amigo">Amigo</Option>
                                <Option value="Vecino">Vecino</Option>
                                <Option value="Compañero de Trabajo">Compañero de Trabajo</Option>
                                <Option value="Otro">Otro</Option>
                              </Select>
                            )}
                          />
                          {errors.referencias_personales?.[index]?.relacion && (
                            <div className="text-red-500 text-xs mt-1">
                              {errors.referencias_personales[index].relacion.message}
                            </div>
                          )}

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
                    ))}

                    <Button
                      size="sm"
                      color="blue"
                      variant="outlined"
                      onClick={() => appendReferencia({ nombre: "", telefono: "", relacion: "", direccion: "" })}
                      className="mt-4"
                    >
                      Agregar Referencia
                    </Button>
                  </div>
                </div>
              </TabPanel>

              {/* Tab Documentos */}
              <TabPanel value={5}>
                <Typography variant="h6" color="blue-gray" className="mb-4">
                  Documentos Requeridos
                </Typography>
                <div className="min-h-[300px]">
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <Typography variant="paragraph" color="blue-gray" className="mb-4">
                      Marque los documentos que el propietario ha proporcionado.
                    </Typography>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Controller
                        name="documentacion.ine"
                        control={control}
                        render={({ field }) => (
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              className="mr-2"
                            />
                            <label>INE/IFE *</label>
                          </div>
                        )}
                      />

                      <Controller
                        name="documentacion.curp"
                        control={control}
                        render={({ field }) => (
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              className="mr-2"
                            />
                            <label>CURP *</label>
                          </div>
                        )}
                      />

                      <Controller
                        name="documentacion.rfc"
                        control={control}
                        render={({ field }) => (
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              className="mr-2"
                            />
                            <label>RFC *</label>
                          </div>
                        )}
                      />

                      <Controller
                        name="documentacion.escrituras"
                        control={control}
                        render={({ field }) => (
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              className="mr-2"
                            />
                            <label>Escrituras *</label>
                          </div>
                        )}
                      />

                      <Controller
                        name="documentacion.predial_pagado"
                        control={control}
                        render={({ field }) => (
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              className="mr-2"
                            />
                            <label>Predial Pagado *</label>
                          </div>
                        )}
                      />

                      <Controller
                        name="documentacion.libre_gravamen"
                        control={control}
                        render={({ field }) => (
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              className="mr-2"
                            />
                            <label>Libre de Gravamen *</label>
                          </div>
                        )}
                      />

                      <Controller
                        name="documentacion.comprobante_domicilio"
                        control={control}
                        render={({ field }) => (
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              className="mr-2"
                            />
                            <label>Comprobante de Domicilio *</label>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </TabPanel>

              {/* Tab Venta */}
              <TabPanel value={6}>
                <Typography variant="h6" color="blue-gray" className="mb-4">
                  Información de Venta
                </Typography>
                <div className="min-h-[300px]">
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <Typography variant="paragraph" color="blue-gray" className="mb-4">
                      Complete la información relacionada con la venta de la propiedad.
                    </Typography>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Controller
                        name="venta.en_venta"
                        control={control}
                        render={({ field }) => (
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              className="mr-2"
                            />
                            <label>Propiedad en Venta</label>
                          </div>
                        )}
                      />

                      <Controller
                        name="venta.precio_venta"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="number"
                            label="Precio de Venta"
                            {...field}
                          />
                        )}
                      />

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

                      <Controller
                        name="venta.comision_venta"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="number"
                            label="Comisión de Venta (%)"
                            {...field}
                          />
                        )}
                      />

                      <Controller
                        name="venta.fecha_venta"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="date"
                            label="Fecha de Venta"
                            {...field}
                          />
                        )}
                      />

                      <div className="col-span-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <Typography variant="small" color="blue-gray" className="font-medium mb-2">
                          Estatus de Venta
                        </Typography>
                        <Typography variant="paragraph" color="blue-gray" className="text-sm">
                          El estatus de venta se controla desde el tab "Estatus y Configuración". 
                          Cuando el estatus general sea "Disponible para venta", esta propiedad 
                          aparecerá automáticamente en la sección de Publicidad.
                        </Typography>
                      </div>

                      <Controller
                        name="venta.tipo_credito"
                        control={control}
                        render={({ field }) => (
                          <Select
                            label="Tipo de Crédito"
                            value={field.value}
                            onChange={(value) => field.onChange(value)}
                          >
                            <Option value="Contado">Contado</Option>
                            <Option value="Infonavit">Infonavit</Option>
                            <Option value="Fovissste">Fovissste</Option>
                            <Option value="Bancario">Bancario</Option>
                            <Option value="Mixto">Mixto</Option>
                          </Select>
                        )}
                      />
                    </div>

                    <div className="mt-4">
                      <Typography variant="small" className="font-medium mb-2 text-blue-gray-500">
                        Información del Comprador
                      </Typography>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Controller
                          name="venta.comprador.nombre"
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="text"
                              label="Nombre del Comprador"
                              {...field}
                            />
                          )}
                        />

                        <Controller
                          name="venta.comprador.telefono"
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="tel"
                              label="Teléfono del Comprador"
                              {...field}
                            />
                          )}
                        />

                        <Controller
                          name="venta.comprador.correo"
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="email"
                              label="Correo del Comprador"
                              {...field}
                            />
                          )}
                        />

                        <Controller
                          name="venta.comprador.direccion"
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="text"
                              label="Dirección del Comprador"
                              {...field}
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Typography variant="small" className="font-medium mb-2 text-blue-gray-500">
                        Documentos Entregados
                      </Typography>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Controller
                          name="venta.documentos_entregados.contrato"
                          control={control}
                          render={({ field }) => (
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={(e) => field.onChange(e.target.checked)}
                                className="mr-2"
                              />
                              <label>Contrato de Compra-Venta</label>
                            </div>
                          )}
                        />

                        <Controller
                          name="venta.documentos_entregados.identificacion"
                          control={control}
                          render={({ field }) => (
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={(e) => field.onChange(e.target.checked)}
                                className="mr-2"
                              />
                              <label>Identificación del Comprador</label>
                            </div>
                          )}
                        />

                        <Controller
                          name="venta.documentos_entregados.constancia_credito"
                          control={control}
                          render={({ field }) => (
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={(e) => field.onChange(e.target.checked)}
                                className="mr-2"
                              />
                              <label>Constancia de Crédito</label>
                            </div>
                          )}
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Controller
                        name="venta.observaciones"
                        control={control}
                        render={({ field }) => (
                          <Textarea
                            label="Observaciones"
                            {...field}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              </TabPanel>

              {/* Tab Estatus y Configuración */}
              <TabPanel value={7}>
                <Typography variant="h6" color="blue-gray" className="mb-4">
                  Estatus y Configuración de la Captación
                </Typography>
                <div className="min-h-[300px]">
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                                         <Typography variant="paragraph" color="blue-gray" className="mb-4">
                       Configure el estatus general de la captación y parámetros adicionales.
                     </Typography>
                     
                     <div className="bg-blue-50 p-3 rounded-lg mb-4">
                       <Typography variant="small" color="blue-gray" className="font-medium">
                         ℹ️ Información sobre Estatus Unificado:
                       </Typography>
                       <Typography variant="small" color="blue-gray">
                         • <strong>Estatus Principal:</strong> Controla todo el flujo del proyecto desde un solo lugar<br/>
                         • <strong>No hay duplicados:</strong> Solo existe este campo de estatus para evitar confusión<br/>
                         • <strong>Disponible para venta:</strong> Se activa automáticamente en Publicidad y Marketing<br/>
                         • <strong>Remodelacion:</strong> Habilita gestión de presupuesto y materiales
                       </Typography>
                     </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Controller
                        name="captacion.estatus_actual"
                        control={control}
                        render={({ field }) => (
                          <Select
                            label="Estatus Actual *"
                            value={field.value}
                            onChange={(value) => field.onChange(value)}
                          >
                            <Option value="Captación">Captación</Option>
                            <Option value="En trámite legal">En trámite legal</Option>
                            <Option value="Remodelacion">Remodelacion</Option>
                            <Option value="Disponible para venta">Disponible para venta</Option>
                            <Option value="Vendida">Vendida</Option>
                            <Option value="Cancelada">Cancelada</Option>
                          </Select>
                        )}
                      />

                      <Controller
                        name="captacion.presupuesto_estimado"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="number"
                            label="Presupuesto Estimado (MXN)"
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            {...field}
                            disabled={watch('captacion.estatus_actual') !== 'Remodelacion'}
                          />
                        )}
                      />

                      <Controller
                        name="captacion.supervisor_id"
                        control={control}
                        render={({ field }) => (
                          <Select
                            label="Supervisor Asignado"
                            value={field.value || ""}
                            onChange={(value) => field.onChange(value)}
                            disabled={watch('captacion.estatus_actual') !== 'Remodelacion'}
                            error={!!errors.captacion?.supervisor_id}
                          >
                            <Option value="">Seleccionar supervisor</Option>
                            {supervisores.map((supervisor) => (
                              <Option key={supervisor._id} value={supervisor._id}>
                                {supervisor.name}
                              </Option>
                            ))}
                          </Select>
                        )}
                      />
                      {errors.captacion?.supervisor_id && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors.captacion.supervisor_id.message}
                        </div>
                      )}


                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                             <Controller
                         name="captacion.tipo_captacion"
                         control={control}
                         render={({ field }) => (
                           <Select
                             label="Tipo de Captación (Opcional)"
                             value={field.value}
                             onChange={(value) => field.onChange(value)}
                           >
                             <Option value="Abierta">Abierta</Option>
                             <Option value="Cerrada">Cerrada</Option>
                             <Option value="Exclusiva">Exclusiva</Option>
                           </Select>
                         )}
                       />

                       <Controller
                         name="captacion.observaciones"
                         control={control}
                         render={({ field }) => (
                           <Textarea
                             label="Observaciones Generales (Opcional)"
                             placeholder="Observaciones sobre el estatus y configuración..."
                             {...field}
                           />
                         )}
                       />
                    </div>

                    {/* Información adicional cuando el estatus es Remodelacion */}
                    {watch('captacion.estatus_actual') === 'Remodelacion' && (
                      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <Typography variant="h6" color="green" className="mb-2">
                          Configuración de Remodelación
                        </Typography>
                        <Typography variant="small" color="green" className="mb-4">
                          Al cambiar el estatus a "Remodelacion", se habilitará la gestión de presupuesto y materiales.
                        </Typography>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white p-3 rounded border">
                            <Typography variant="small" color="blue-gray" className="font-medium">
                              Presupuesto Estimado:
                            </Typography>
                            <Typography variant="h6" color="green" className="font-bold">
                              {watch('captacion.presupuesto_estimado') 
                                ? `$${parseFloat(watch('captacion.presupuesto_estimado')).toLocaleString('es-MX', {minimumFractionDigits: 2})}`
                                : 'Sin presupuesto'
                              }
                            </Typography>
                          </div>
                          
                          <div className="bg-white p-3 rounded border">
                            <Typography variant="small" color="blue-gray" className="font-medium">
                              Acciones Disponibles:
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                              • Gestión de presupuesto<br/>
                              • Control de materiales<br/>
                              • Solicitudes de contratistas<br/>
                              • Reportes de gastos
                            </Typography>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabPanel>
            </TabsBody>
          </Tabs>

          {error && (
            <Alert color="red" className="mt-4">
              {error}
            </Alert>
          )}

          {successMessage && (
            <Alert color="green" className="mt-4">
              {successMessage}
            </Alert>
          )}

          <div className="flex justify-end gap-4 mt-6">
            <Button
              variant="outlined"
              color="blue-gray"
              onClick={() => navigate("/dashboard/captaciones")}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              color="blue"
              disabled={isLoading}
            >
              {isLoading ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}

export default EditarCaptacion; 