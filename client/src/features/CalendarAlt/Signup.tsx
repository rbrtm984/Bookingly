import React from 'react'
// import Lunch from '../../assets/Lunch.png'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'

interface Statuses {
    [key: string]: string;
  }

const statuses: Statuses = {
  Available: 'text-green-700 bg-green-50 ring-green-600/20',
  Full: 'text-red-700 bg-red-50 ring-red-600/10',
}

// Define interfaces for your clients and their invoices.
interface Status{
    date: string;
    dateTime: string;
    status: keyof Statuses; // Ensures status matches the keys of Statuses.
  }
  
  interface TimeSlot {
    id: number;
    name: string;
    imageUrl: any;
    status: Status;
  }

const timeslots: TimeSlot[] = [
  {
    id: 1,
    name: 'Lunch',
    imageUrl: 'https://i.imgur.com/FPv5gVR.png',
    status: { date: 'December 13, 2022', dateTime: '2022-12-13', status: 'Full' },
  },
  {
    id: 2,
    name: 'Dinner',
    imageUrl: 'https://i.imgur.com/DCIgFpn.png',
    status: { date: 'January 22, 2023', dateTime: '2023-01-22', status: 'Available' },
  },
  {
    id: 3,
    name: 'Evening',
    imageUrl: 'https://i.imgur.com/WiwY0bi.png',
    status: { date: 'January 23, 2023', dateTime: '2023-01-23', status: 'Available' },
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function CalendarAlt() {
  return (
    <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
      {timeslots.map((timeslot) => (
        <li key={timeslot.id} className="overflow-hidden rounded-xl border border-gray-200">
          <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-neutral-100 p-6">
            <img
              src={timeslot.imageUrl}
              alt={`Time slot for ${timeslot.name}`}
              className="h-auto w-1/2 flex-none bg-white object-cover"
            />
            <Menu as="div" className="relative ml-auto">
              <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Open options</span>
                <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        View<span className="sr-only">, {timeslot.name}</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        Edit<span className="sr-only">, {timeslot.name}</span>
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Slot 1</dt>
              <dd className="text-gray-700">
                {/* <time dateTime={timeslot.lastInvoice.dateTime}>{timeslot.lastInvoice.date}</time> */}
                {/**Some logic for rendering a single slot */}
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Slot 2</dt>
              <dd className="text-gray-700">
                {/* <time dateTime={timeslot.lastInvoice.dateTime}>{timeslot.lastInvoice.date}</time> */}
                {/**Some logic for rendering a single slot */}
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Slot 3</dt>
              <dd className="text-gray-700">
                {/* <time dateTime={timeslot.lastInvoice.dateTime}>{timeslot.lastInvoice.date}</time> */}
                {/**Some logic for rendering a single slot */}
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Slot 4</dt>
              <dd className="text-gray-700">
                {/* <time dateTime={timeslot.lastInvoice.dateTime}>{timeslot.lastInvoice.date}</time> */}
                {/**Some logic for rendering a single slot */}
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
            <button
              type="button"
              className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Let's Kart!
            </button>
              {/**Race Status*/}
              <dd className="flex items-start gap-x-2">
                {/** Status of race Full/Available */}
                <div
                  className={classNames(
                    statuses[timeslot.status.status],
                    'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'
                  )}
                >
                  {timeslot.status.status}
                </div>
              </dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  )
}
