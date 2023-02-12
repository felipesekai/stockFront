import { Products } from '../utils/@Types'
export function save(key: string, data: object) {
    return localStorage.setItem(key, JSON.stringify(data))
}
export function get(key: string) {
    const data = localStorage.getItem(key)
    if (data !== null) {
        return JSON.parse(data)
    }
    return null;

}
