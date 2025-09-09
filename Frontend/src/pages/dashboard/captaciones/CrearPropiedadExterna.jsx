import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader, Typography, Button, Input, Select, Option, Textarea, Alert } from '@material-tailwind/react';
import { captacionesAPI } from '@/services/api';

export function CrearPropiedadExterna() {
    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [form, setForm] = useState({
        origen: 'Mercado Libre',
        tipo_operacion: 'Venta',
        fuente_externa: '',
        propietario: {
            nombre: '',
            telefono: '',
            correo: ''
        },
        propiedad: {
            tipo: 'Casa',
            direccion: {
                calle: '', numero: '', colonia: '', ciudad: '', estado: '', codigo_postal: ''
            },
            caracteristicas: {
                m2_terreno: '', m2_construccion: '', habitaciones: '', baños: '', cocheras: '', descripcion: ''
            },
            descripcion_adicional: ''
        }
    });

    const handleChange = (path, value) => {
        setForm(prev => {
            const updated = { ...prev };
            const keys = path.split('.');
            let ref = updated;
            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                ref[key] = ref[key] || {};
                ref = ref[key];
            }
            ref[keys[keys.length - 1]] = value;
            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        try {
            const payload = {
                origen: form.origen,
                tipo_operacion: form.tipo_operacion,
                fuente_externa: form.fuente_externa,
                propietario: form.propietario,
                propiedad: form.propiedad
            };
            const resp = await captacionesAPI.createExterna(payload);
            setSuccess('Propiedad creada correctamente');
            const id = resp?.data?._id || resp?._id;
            if (id) {
                // Redirigir al listado de captaciones para continuar el flujo
                navigate(`/captaciones`);
            }
        } catch (err) {
            setError(err?.message || 'Error al crear la propiedad');
        } finally {
            setSaving(false);
        }
    };

    return (
        <Card className="w-full max-w-6xl mx-auto">
            <CardHeader variant="gradient" color="blue" className="mb-4 p-6">
                <Typography variant="h6" color="white">
                    Nueva Propiedad Externa (Mercado Libre / Renta)
                </Typography>
            </CardHeader>
            <CardBody className="p-6">
                {error && <Alert color="red" className="mb-4">{error}</Alert>}
                {success && <Alert color="green" className="mb-4">{success}</Alert>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Select label="Origen" value={form.origen} onChange={(v) => handleChange('origen', v)}>
                            <Option value="Mercado Libre">Mercado Libre</Option>
                            <Option value="Renta Externa">Renta Externa</Option>
                            <Option value="Otro">Otro</Option>
                        </Select>
                        <Select label="Operación" value={form.tipo_operacion} onChange={(v) => handleChange('tipo_operacion', v)}>
                            <Option value="Venta">Venta</Option>
                            <Option value="Renta">Renta</Option>
                        </Select>
                        <Input label="Fuente externa (URL o nota)" value={form.fuente_externa} onChange={(e) => handleChange('fuente_externa', e.target.value)} />
                    </div>

                    <Typography variant="h6">Propietario / Inmobiliaria</Typography>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input label="Nombre" value={form.propietario.nombre} onChange={(e) => handleChange('propietario.nombre', e.target.value)} required />
                        <Input label="Teléfono" value={form.propietario.telefono} onChange={(e) => handleChange('propietario.telefono', e.target.value)} />
                        <Input label="Correo" value={form.propietario.correo} onChange={(e) => handleChange('propietario.correo', e.target.value)} />
                    </div>

                    <Typography variant="h6">Dirección</Typography>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input label="Calle" value={form.propiedad.direccion.calle} onChange={(e) => handleChange('propiedad.direccion.calle', e.target.value)} />
                        <Input label="Número" value={form.propiedad.direccion.numero} onChange={(e) => handleChange('propiedad.direccion.numero', e.target.value)} />
                        <Input label="Colonia" value={form.propiedad.direccion.colonia} onChange={(e) => handleChange('propiedad.direccion.colonia', e.target.value)} />
                        <Input label="Ciudad" value={form.propiedad.direccion.ciudad} onChange={(e) => handleChange('propiedad.direccion.ciudad', e.target.value)} />
                        <Input label="Estado" value={form.propiedad.direccion.estado} onChange={(e) => handleChange('propiedad.direccion.estado', e.target.value)} />
                        <Input label="Código Postal" value={form.propiedad.direccion.codigo_postal} onChange={(e) => handleChange('propiedad.direccion.codigo_postal', e.target.value)} />
                    </div>

                    <Typography variant="h6">Propiedad</Typography>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Select label="Tipo" value={form.propiedad.tipo} onChange={(v) => handleChange('propiedad.tipo', v)}>
                            <Option value="Casa">Casa</Option>
                            <Option value="Departamento">Departamento</Option>
                            <Option value="Condominio">Condominio</Option>
                            <Option value="Terreno">Terreno</Option>
                            <Option value="Local">Local</Option>
                            <Option value="Bodega">Bodega</Option>
                            <Option value="Edificio">Edificio</Option>
                        </Select>
                        <Input type="number" label="m² Terreno" value={form.propiedad.caracteristicas.m2_terreno} onChange={(e) => handleChange('propiedad.caracteristicas.m2_terreno', e.target.value)} />
                        <Input type="number" label="m² Construcción" value={form.propiedad.caracteristicas.m2_construccion} onChange={(e) => handleChange('propiedad.caracteristicas.m2_construccion', e.target.value)} />
                        <Input type="number" label="Habitaciones" value={form.propiedad.caracteristicas.habitaciones} onChange={(e) => handleChange('propiedad.caracteristicas.habitaciones', e.target.value)} />
                        <Input type="number" label="Baños" value={form.propiedad.caracteristicas.baños} onChange={(e) => handleChange('propiedad.caracteristicas.baños', e.target.value)} />
                        <Input type="number" label="Cocheras" value={form.propiedad.caracteristicas.cocheras} onChange={(e) => handleChange('propiedad.caracteristicas.cocheras', e.target.value)} />
                    </div>

                    <Textarea label="Descripción" value={form.propiedad.caracteristicas.descripcion} onChange={(e) => handleChange('propiedad.caracteristicas.descripcion', e.target.value)} />

                    <div className="flex justify-end gap-3">
                        <Button variant="outlined" color="blue-gray" onClick={() => navigate(-1)} disabled={saving}>Cancelar</Button>
                        <Button color="blue" type="submit" disabled={saving}>{saving ? 'Guardando...' : 'Crear y continuar a Marketing'}</Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}

export default CrearPropiedadExterna;


