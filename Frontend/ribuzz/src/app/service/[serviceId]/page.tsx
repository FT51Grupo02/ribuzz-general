import { FC } from 'react';
import { notFound } from 'next/navigation';
import Service from '@/components/ServiceDetail/Services';
import { services } from '@/components/ServiceDetail/serviceData';

interface Props {
  params: {
    serviceId: string;
  };
}

const ServicePage: FC<Props> = ({ params }) => {
  const { serviceId } = params;

  const service = services.find(s => s.id === serviceId);

  return (
    <div>
      {service ? (
        <Service {...service} />
      ) : (
        notFound() 
      )}
    </div>
  );
};

export default ServicePage;
