import { notFound } from 'next/navigation';
import Service from '@/components/ServiceDetail/Services';
import { Service as ServiceType } from '@/components/Cards/types';

interface Props {
  params: {
    serviceId: string;
  };
}

// Define la función para obtener el servicio desde la API
const fetchService = async (serviceId: string): Promise<ServiceType | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/${serviceId}`, {
      cache: 'no-store',
      method: 'GET',
    });

    if (!response.ok) {
      console.error('Error fetching service:', response.statusText);
      return null;
    }

    const service: ServiceType = await response.json();

    // Asegúrate de que 'stock' esté presente en el servicio
    if (service && typeof service.stock === 'undefined') {
      service.stock = 0; // O cualquier valor predeterminado apropiado
    }

    return service;
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
};

// Define el componente de página de servicio
const ServicePage = async ({ params }: Props) => {
  const { serviceId } = params;
  const service = await fetchService(serviceId);

  if (!service) {
    notFound();
    return null;
  }

  return (
    <div>
      {/* Asegúrate de que el objeto 'service' tenga todas las propiedades necesarias */}
      <Service
        name={service.name}
        description={service.description}
        images={service.images}
        videos={service.videos || []}
        providerInfo={service.providerInfo || { name: '', contact: '' }}
        details={service.details || []}
        reviews={service.reviews || []}
        price={service.price}
        stock={service.stock}
      />
    </div>
  );
};

export default ServicePage;
