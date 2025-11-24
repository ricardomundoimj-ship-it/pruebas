import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, FileText, BarChart3, Settings, Users, ShoppingCart } from "lucide-react"

const projects = [
  {
    id: "cotizador",
    title: "Cotizador",
    description: "Sistema flexible de cotización con gestión de plazos, bonos y fraccionamiento por horas",
    icon: Calculator,
    color: "from-blue-500 to-blue-600",
    available: true,
  },
  {
    id: "facturacion",
    title: "Facturación",
    description: "Módulo completo para generar y gestionar facturas electrónicas",
    icon: FileText,
    color: "from-green-500 to-green-600",
    available: false,
  },
  {
    id: "reportes",
    title: "Reportes",
    description: "Dashboard con análisis y reportes detallados de ventas y operaciones",
    icon: BarChart3,
    color: "from-purple-500 to-purple-600",
    available: false,
  },
  {
    id: "clientes",
    title: "Gestión de Clientes",
    description: "CRM para administrar contactos, historial y relaciones con clientes",
    icon: Users,
    color: "from-orange-500 to-orange-600",
    available: false,
  },
  {
    id: "inventario",
    title: "Inventario",
    description: "Control de stock, productos y gestión de almacén en tiempo real",
    icon: ShoppingCart,
    color: "from-red-500 to-red-600",
    available: false,
  },
  {
    id: "configuracion",
    title: "Configuración",
    description: "Panel de administración y configuración del sistema",
    icon: Settings,
    color: "from-gray-500 to-gray-600",
    available: false,
  },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Panel de Aplicaciones
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Selecciona una aplicación para comenzar. Cada módulo está diseñado para optimizar tus procesos de negocio.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project) => {
            const Icon = project.icon
            return (
              <Card
                key={project.id}
                className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  project.available
                    ? "hover:scale-105 cursor-pointer border-2 hover:border-blue-500"
                    : "opacity-60 cursor-not-allowed"
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
                
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${project.color} text-white shadow-lg`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      {!project.available && (
                        <span className="text-xs text-muted-foreground font-normal">Próximamente</span>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <CardDescription className="text-base mb-4 min-h-[3rem]">
                    {project.description}
                  </CardDescription>
                  
                  {project.available ? (
                    <Button 
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        console.log('Navegando a:', `/${project.id}`)
                        navigate(`/${project.id}`)
                      }}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md relative z-20"
                      type="button"
                    >
                      Abrir aplicación
                    </Button>
                  ) : (
                    <Button 
                      disabled 
                      className="w-full"
                      variant="secondary"
                    >
                      No disponible
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            Más aplicaciones se agregarán próximamente
          </p>
        </div>
      </div>
    </div>
  )
}

