export class Documento {
    id_documento?: number;
    nombre?: string;
    n_cite?: string;
    tipo?: string;
    fecha_registro?: Date;
    fecha_modificacion?: Date;
    id_proceso?: number;
    n_correspondencia?: string;
    rutaservidor?: string;
    rutaservidorSISDOC?: string;
    nombreservidor?: string;
    usuario_registro?: string;
    estado?: string;
    id_usuario?: number;
    id_perfil?: number;
    ci?: string;
    referencia?: string;
    archivoFisico?: File
}
