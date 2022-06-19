import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { get, isEmpty } from 'lodash'

const table = [
  {
    header: 'Grupa majora',
    data: 'embedded.ancestors[4].title'
  },
  {
    header: 'Cod_gr_maj',
    data: 'code',
    callback: prop => prop && `${prop}`.substring(0, 1)
  },
  {
    header: 'Grupa submajora',
    data: 'embedded.ancestors[3].title'
  },
  {
    header: 'Cod_gr_submaj',
    data: 'code',
    callback: prop => prop && `${prop}`.substring(0, 2)
  },
  {
    header: 'Grupa minora',
    data: 'embedded.ancestors[2].title'
  },
  {
    header: 'Cod_gr_min',
    data: 'code',
    callback: prop => prop && `${prop}`.substring(0, 3)
  },
  {
    header: 'Grupa de baza',
    data: 'embedded.ancestors[1].title'
  },
  {
    header: 'Cod_gr_baza',
    data: 'code',
    callback: prop => prop && `${prop}`.substring(0, 4)
  },
  {
    header: 'Denumire_Ocupatie_ENG',
    data: 'alternativeLabel.en[0]'
  },
  {
    header: 'Denumire_Ocupatie_RO',
    data: 'embedded.ancestors[0].title'
  },
  {
    header: 'Cod_ocup',
    data: 'code',
    callback: prop => prop && `${prop}`.substring(0, 6)
  },
  {
    header: 'Descriere_ocup_ENG',
    data: 'description.en.literal'
  },
  {
    header: 'Descriere_ocup_RO',
    data: 'description.ro.literal'
  },
  {
    header: 'Etichete_alternative_ENG',
    data: 'alternativeLabel.en[0]'
  },
  {
    header: 'Etichete_alternative_RO',
    data: 'alternativeLabel.ro[0]'
  },
  {
    header: 'Competente_ENG',
    data: ''
  },
  {
    header: 'Competente_RO',
    data: ''
  },
  {
    header: 'Descriere_comp_ENG',
    data: ''
  },
  {
    header: 'Descriere_comp_RO',
    data: ''
  },
  {
    header: 'Tip competenta (aptitudini principale/secundare sau cunostinte principale/secundare)',
    data: ''
  },
  {
    header: 'Tip aptitudini/cunostinte (transectoriala, transversala, digitala, cercetare etc)',
    data: ''
  },
  {
    header: 'ISCED Ocupatie',
    data: ''
  },
  {
    header: 'Observații',
    data: ''
  }


]

const Table = ({ data }) => {
  const [clipboardCopy, setClipboardCopy] = useState('')
  const copyTextToClipboard = () => {
    const regex = new RegExp(',', 'g')
    const tableText = table.map(cell => get(data, cell.data)).join('\t')

    navigator.clipboard.writeText(tableText).then(function () {
      setClipboardCopy('Copied')
    }, function (err) {
      setClipboardCopy('Could not copy text: ', err)
    })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setClipboardCopy('')
    }, 1000)
    return () => clearTimeout(timer)
  }, [clipboardCopy])

  return (
    <>
      <table className='min-w-full divide-y divide-gray-300'>
        <thead className='bg-gray-50'>
          <tr>
            {table.map(cell => <th key={nanoid()} className='whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'>{cell.header}</th>)}
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200 bg-white'>
          <tr className='w-96 align-top'>{table.map(cell =>
            <td key={nanoid()} className='py-3.5 pl-4 pr-3 text-left text-sm text-gray-900 sm:pl-6'>
              {/* {cell.callback ? 1 : get(data, cell.data)} */}
              {cell?.callback ? cell.callback(get(data, cell.data)) : get(data, cell.data)}
            </td>)}
          </tr>
        </tbody>
      </table>
      <div className="sticky left-0 flex align-center">
        <button onClick={copyTextToClipboard} disabled={isEmpty(data)} type="button" className="mt-3 flex items-center justify-center px-2 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
          Copy data
        </button>
        <div className='mt-3 mx-4 flex items-center justify-center text-sm text-gray-500'>{data && clipboardCopy && clipboardCopy}</div>
      </div>
    </>
  )
}

export default Table