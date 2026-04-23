# AUTOS VELACRUZ - Contenido del Sitio

Documento centralizado con toda la información del sitio. Modifica los valores aquí y luego actualiza los archivos JSON correspondientes.

---

## 📋 Información de la Empresa

```json
{
  "name": "AUTOS VELACRUZ",
  "location": "Valdemoro, Madrid",
  "email": "contacto@autosvelacruz.es",
  "phone": "+34 916 33 00 44",
  "tagline": "Experiencia de Lujo en Automoción",
  "description": "En AUTOS VELACRUZ le ofrecemos una amplia selección de vehículos de segunda mano y ocasión con el mejor precio y condiciones del mercado."
}
```

---

## 🏆 Características Principales (4 Features)

Las características aparecen en la página principal en la sección "¿Por Qué Elegirnos?"

| # | Título | Descripción | Icono |
|---|--------|-------------|-------|
| 1 | Amplia Variedad | Vehículos de todas las marcas y segmentos del mercado | grid (🏆) |
| 2 | Entrega a Domicilio | Entregamos en cualquier punto de la península | truck (🚚) |
| 3 | Vehículos Revisados | Exhaustiva revisión antes de su venta | check (✅) |
| 4 | Financiación | A medida de tus necesidades | credit (💰) |

---

## 🚗 Vehículos en Catálogo

**Total: 70 vehículos**

### Formato de Vehículo
```
Nombre: PORSCHE Macan S diesel
Slug: porsche-macan-s-diesel
Precio: 32.900€
Año: 2016
Kilometraje: 225.100 km
Combustible: Diésel
Transmisión: Automático
Etiqueta Emisión: C (Emisiones Moderadas)
Imagen: https://autosvelacruz.es/wp-content/uploads/2026/03/IMG_20260331_013140.png
```

### Etiquetas de Emisión
- **C** = Emisiones Moderadas (amarillo)
- **B** = Bajas Emisiones (verde oscuro)
- **ECO** = Ecológicos/Híbridos (verde claro)
- **CERO** = Cero Emisiones/Eléctricos (azul)

### Vehículos Destacados (Primeros 6 que aparecen en inicio)
1. PORSCHE Macan S diesel - 32.900€ (2016)
2. TOYOTA C-HR 1.8 125H Advance - 16.900€ (2017)
3. HYUNDAI KONA 1.6 GDI HEV Style Sky DCT - 17.500€ (2020)
4. DACIA Dokker Stepway dci - 13.900€ (2016)
5. PEUGEOT 508 ACTIVE 1.6 THP - 8.500€ (2012)
6. BMW Serie 3 318i E90 - 12.000€ (2011)

### Conteo por Etiqueta de Emisión
- **C (Emisiones Moderadas)**: ~48 vehículos
- **B (Bajas Emisiones)**: ~12 vehículos
- **ECO (Híbridos)**: ~6 vehículos
- **CERO (Eléctricos)**: ~4 vehículos

---

## 💬 Testimonios de Clientes

**Total: 9 testimonios**

| # | Nombre | Rol | Testimonio |
|---|--------|-----|-----------|
| 1 | Hugo Cortes  | Comprador Verificado | "Simplemente encantado!!! Todo súper ágil y súper fácil con David, el cual el trato ha sido inmejorable. Los mejores precios y estados de coches y mira que me tiré varios días buscando por muchas páginas. Gracias por el servicio y estoy disfrutándolo como un enano!" |
| 2 | María Rodríguez | Comprador Satisfecho | "Hace ya más de un año que compré mi coche y estoy encantada, está igual de bien que el primer día. El trato fue estupendo desde el minuto uno. Los recomendaría totalmente." |
| 3 | Juan López | Ejecutivo | "Excelente servicio, profesionales de verdad. Me ayudaron a encontrar el coche perfecto a un precio justo. La entrega a domicilio fue rápida y sin problemas." |
| 4 | Patricia Hernández | Gerente | "Impresionante la variedad de vehículos. Comparé con otros concesionarios y AUTOS VELACRUZ ofrece la mejor relación calidad-precio. Muy recomendable." |
| 5 | Carlos Menéndez | Empresario | "El equipo es muy atento y profesional. Me explicaron todo el proceso de financiación de manera clara. Mi nueva BMW es una joya, gracias AUTOS VELACRUZ." |
| 6 | Ana Fernández | Abogada | "Llevo meses con mi coche nuevo y no tengo ni una queja. La revisión previa fue exhaustiva, se nota que cuidan cada detalle. Volveré a comprar aquí." |
| 7 | Roberto Silva | Ingeniero | "Trasladarme a otra ciudad y conseguir que me entreguem el coche en mi nueva dirección fue muy cómodo. Servicio de entrega a domicilio impecable." |
| 8 | Sandra Martínez | Profesional Independiente | "Me presentaron varios modelos dentro de mi presupuesto. La honestidad y transparencia del equipo me ganó desde el primer día. Muy profesionales." |
| 9 | Miguel Sánchez | Arquitecto | "Mejor decisión comprar aquí. El coche ha superado mis expectativas en estado y funcionamiento. El equipo de AUTOS VELACRUZ es excepcional." |

---

## 📄 Textos de Página Principal (index.astro)

### Meta Tags
```
Título: AUTOS VELACRUZ | Concesionario de Lujo en Valdemoro
Descripción: Amplia selección de vehículos de segunda mano y ocasión. Financiación personalizada, entrega a domicilio, máxima tasación.
```

### Secciones Principales

**1. Hero Section**
- Contenido: Componente React (HeroSection)
- Incluye: Vídeo y carrusel de logos de marcas

**2. Features Section**
- Título: "¿Por Qué Elegirnos?"
- Contenido: 4 tarjetas con características principales

**3. Featured Vehicles Section**
- Título: "Vehículos Destacados"
- Contenido: 6 vehículos principales (primeros del catálogo)
- Botón CTA: "Ver Todo el Inventario" → `/catalogo`

**4. Environmental Labels Section**
- Título: "Distintivo Ambiental"
- Contenido: 4 tarjetas con etiquetas de emisión
- Enlaces a: `/etiqueta/C`, `/etiqueta/B`, `/etiqueta/ECO`, `/etiqueta/CERO`

**5. Testimonials Section**
- Título: "Opiniones de Clientes"
- Contenido: Carrusel de testimonios

**6. Call to Action Final**
- Título: "Encuentra Tu Vehículo Ideal Hoy"
- Subtítulo: "Contáctanos para una consulta sin compromiso"
- Botón: "Reservar Cita" → `/contacto`

---

## 🎨 Colores por Etiqueta de Emisión

| Etiqueta | Color | Código Tailwind |
|----------|-------|-----------------|
| C | Amarillo oscuro | `bg-yellow-600` |
| B | Verde oscuro | `bg-green-700` |
| ECO | Verde claro | `bg-green-500` |
| CERO | Azul | `bg-blue-600` |

---

## 🔗 Páginas del Sitio

| Página | Ruta | Descripción |
|--------|------|-------------|
| Inicio | `/` | Página principal con featured vehicles |
| Catálogo | `/catalogo` | Listado completo de vehículos |
| Contacto | `/contacto` | Formulario de contacto |
| Sobre Nosotros | `/sobre-nosotros` | Información de la empresa |
| Servicios | `/servicios` | Servicios disponibles |
| Compramos Tu Coche | `/compramos-tu-coche` | Formulario para vender vehículo |
| Vehículos por Encargo | `/vehiculos-por-encargo` | Servicio de búsqueda personalizada |
| Etiquetas por Emisión | `/etiqueta/[C\|B\|ECO\|CERO]` | Vehículos filtrados por etiqueta |
| Blog | `/blog/financiacion` | Artículos de financiación |

---

## 📝 Cómo Usar Este Documento

1. **Para actualizar vehículos**: Edita los datos en la tabla de vehículos y luego actualiza `src/data/catalog.json`
2. **Para cambiar testimonios**: Edita los testimonios en la tabla y luego actualiza `src/data/catalog.json`
3. **Para cambiar textos**: Edita los textos de las secciones y luego actualiza los archivos `.astro` correspondientes
4. **Para cambiar características**: Edita la tabla de Features y luego actualiza `src/data/catalog.json`

---

## 📚 Archivos Relacionados

| Archivo | Ubicación | Contiene |
|---------|-----------|----------|
| Catálogo | `src/data/catalog.json` | Todos los vehículos, testimonios y datos de empresa |
| Featured | `src/content/vehicles/featured.json` | Vehículos destacados (6 primeros) |
| Página Inicio | `src/pages/index.astro` | HTML y lógica de página principal |
| Catálogo Page | `src/pages/catalogo.astro` | Listado completo de vehículos |
| Contacto | `src/pages/contacto.astro` | Formulario de contacto |
| Sobre Nosotros | `src/pages/sobre-nosotros.astro` | Información de empresa |
| Servicios | `src/pages/servicios.astro` | Servicios disponibles |
| Compramos Tu Coche | `src/pages/compramos-tu-coche.astro` | Formulario de compra |
| Vehículos por Encargo | `src/pages/vehiculos-por-encargo.astro` | Servicio personalizado |

---

## ✅ Checklist de Cambios Frecuentes

- [ ] Actualizar precio de vehículos
- [ ] Agregar nuevo vehículo
- [ ] Eliminar vehículo vendido
- [ ] Cambiar información de contacto
- [ ] Agregar nuevo testimonial
- [ ] Modificar textos de secciones
- [ ] Cambiar featured vehicles
- [ ] Actualizar imágenes de vehículos
- [ ] Cambiar información de ubicación
- [ ] Cambiar descripción de empresa

