'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { PhoneNumber } from '@/components/ui/phone-input';
import { Input } from '@/components/ui/input';
import { Title } from '@/components/ui/text';
import cn from '@/utils/class-names';

interface AddressInfoProps {
  type: string;
  title?: string;
  className?: string;
}

export default function AddressInfo({
  type,
  title,
  className,
}: AddressInfoProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div
      className={cn('grid grid-cols-2 gap-3 lg:gap-4 @2xl:gap-5', className)}
    >
      {title && (
        <Title as="h3" className="col-span-full font-semibold">
          {title}
        </Title>
      )}

      <Input
        label="Customer Name"
        placeholder="Customer name"
        {...register(`${type}.customerName`)}
        // @ts-expect-error - Suppressing type check due to complex type inference
        error={errors?.[type]?.customerName?.message as any}
      />
      <Controller
        name={`${type}.phoneNumber`}
        control={control}
        render={({ field: { value, onChange } }) => (
          <PhoneNumber
            label="Phone Number"
            country="us"
            value={value}
            onChange={onChange}
            // @ts-expect-error - Suppressing type check due to complex type inference
            error={errors?.[type]?.phoneNumber?.message as string}
          />
        )}
      />
      <Input
        label="Country"
        placeholder="Country"
        {...register(`${type}.country`)}
        // @ts-expect-error - Suppressing type check due to complex type inference
        error={errors?.[type]?.country?.message as string}
      />
      <Input
        label="State"
        placeholder="State"
        {...register(`${type}.state`)}
        // @ts-expect-error - Suppressing type check due to complex type inference
        error={errors?.[type]?.state?.message as string}
      />
      <Input
        label="City"
        placeholder="City"
        {...register(`${type}.city`)}
        // @ts-expect-error - Suppressing type check due to complex type inference
        error={errors?.[type]?.city?.message as string}
      />
      <Input
        label="ZIP / Postcode"
        placeholder="ZIP / postcode"
        {...register(`${type}.zip`)}
        // @ts-expect-error - Suppressing type check due to complex type inference
        error={errors?.[type]?.zip?.message as string}
      />
      <Input
        label="Street Address"
        placeholder="Street Address"
        className="col-span-full"
        {...register(`${type}.street`)}
        // @ts-expect-error - Suppressing type check due to complex type inference
        error={errors?.[type]?.street?.message as string}
      />
    </div>
  );
}
