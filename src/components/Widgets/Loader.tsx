import { ColorRing } from 'react-loader-spinner'

const LoaderRing = ({ position, left, top }: { position: 'relative' | 'absolute', left: string, top: string }): JSX.Element => {
  return (
    <div style={{
      position: `${position}`,
      left: `${left}`,
      top: `${top}`
    }}>
      <ColorRing
        visible={true}
        height="50"
        width="50"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#284195', '#dfd7f4', '#130b28', '#9a36d9', '#130b28']}
      />
    </div>
  )
}

export default LoaderRing
