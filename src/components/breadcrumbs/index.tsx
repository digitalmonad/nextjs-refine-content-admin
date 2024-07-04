"use client";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@components/ui/breadcrumb";
import { useBreadcrumb } from "@refinedev/core";

import Link from "next/link";

export const Breadcrumbs = () => {
  const { breadcrumbs } = useBreadcrumb({});

  return (
    <Breadcrumb data-test="breadcrumbs">
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb) => {
          return (
            <span className="flex gap-2" key={`breadcrumb-${breadcrumb.label}`}>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                {breadcrumb.href ? (
                  <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                ) : (
                  <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
