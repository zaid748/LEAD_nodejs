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

export function EditarCaptacion() {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener el ID de la URL
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState(null);
  const [initialData, setInitialData] = useState(null);

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
      estado_civil: ""
    },
    propiedad: {
      tipo: "",
      direccion: {
        calle: "",
        numero: "",
        colonia: "",
        ciudad: "",
        estado: "",
        codigo_postal: ""
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
          .required("El código postal es requerido")
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
      .min(2, "Se requieren al menos 2 referencias personales")
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
            estado_civil: data.propietario?.estado_civil || ""
          },
          propiedad: {
            tipo: data.propiedad?.tipo || "",
            direccion: {
              calle: data.propiedad?.direccion?.calle || "",
              numero: data.propiedad?.direccion?.numero || "",
              colonia: data.propiedad?.direccion?.colonia || "",
              ciudad: data.propiedad?.direccion?.ciudad || "",
              estado: data.propiedad?.direccion?.estado || "",
              codigo_postal: data.propiedad?.direccion?.codigo_postal || ""
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
            estatus_venta: data.venta.estatus_venta || "En proceso",
            en_venta: data.venta.estatus_venta === "Disponible para venta" || false,
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

  const onSubmit = async (data) => {
    try {
      console.log("=== INICIANDO ENVÍO DEL FORMULARIO ===");
      console.log("Datos del formulario a enviar:", data);
      console.log("ID de la captación:", id);
      
      setIsLoading(true);
      setError(null);
      
      console.log("Llamando a captacionesAPI.update...");
      const response = await captacionesAPI.update(id, data);
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
                            <Option value="Local Comercial">Local Comercial</Option>
                            <Option value="Oficina">Oficina</Option>
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
                            name={`propiedad.adeudos.${index}.referencia`}
                            control={control}
                            render={({ field }) => (
                              <Input
                                type="text"
                                label="Número de Referencia"
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
                      onClick={() => appendAdeudo({ tipo: "", monto: "", referencia: "" })}
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                      <Controller
                        name="venta.estatus_venta"
                        control={control}
                        render={({ field }) => (
                          <Select
                            label="Estatus de Venta"
                            value={field.value}
                            onChange={(value) => field.onChange(value)}
                          >
                            <Option value="En proceso">En proceso</Option>
                            <Option value="Disponible para venta">Disponible para venta</Option>
                            <Option value="En proceso de venta">En proceso de venta</Option>
                            <Option value="Remodelacion">Remodelacion</Option>
                            <Option value="En proceso de juicio">En proceso de juicio</Option>
                            <Option value="En desalojo">En desalojo</Option>
                            <Option value="Vendida">Vendida</Option>
                            <Option value="Cancelada">Cancelada</Option>
                          </Select>
                        )}
                      />

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