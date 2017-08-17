export const CONF_LOAD = 'CONF_LOAD';

const configAction = (config) => {
  return {
    type: CONF_LOAD,
    config: { ...config }
  }
}
export default configAction;
