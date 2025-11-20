# 🔐 Cómo Crear un Super Administrador

## Opción 1: Usando SQL directamente en la base de datos

Ejecuta este script SQL en tu base de datos:

```sql
-- Insertar un Super Administrador manualmente
INSERT INTO usuarios (nombre, cedula, telefono, email, password, rol_usuario, estado_usuario, fecha_registro)
VALUES (
    'Super Admin',                    -- Nombre del super admin
    '1234567890',                     -- Cédula (debe ser única)
    '3001234567',                     -- Teléfono
    'superadmin@golreserve.com',     -- Email (debe ser único)
    '$2a$10$Xq3Z8Y7W6V5U4T3S2R1Q0e...', -- Password hasheado (ver abajo cómo generarlo)
    'SUPER_ADMINISTRADOR',            -- Rol
    'ACTIVO',                         -- Estado
    NOW()                             -- Fecha actual
);
```

## Opción 2: Usando una ruta temporal en el backend

Puedes crear un endpoint temporal en Spring Boot:

```java
// En un controlador temporal (ELIMINAR después de crear el super admin)
@PostMapping("/api/crear-super-admin-temporal")
public ResponseEntity<?> crearSuperAdminTemporal(@RequestBody UsuarioDTO dto) {
    // IMPORTANTE: Agregar validación de seguridad aquí
    // Por ejemplo, solo permitir en ambiente de desarrollo
    
    Usuario superAdmin = new Usuario();
    superAdmin.setNombre(dto.getNombre());
    superAdmin.setCedula(dto.getCedula());
    superAdmin.setTelefono(dto.getTelefono());
    superAdmin.setEmail(dto.getEmail());
    superAdmin.setPassword(passwordEncoder.encode(dto.getPassword()));
    superAdmin.setRolUsuario(RolUsuario.SUPER_ADMINISTRADOR);
    superAdmin.setEstadoUsuario(EstadoUsuario.ACTIVO);
    superAdmin.setFechaRegistro(LocalDateTime.now());
    
    usuarioRepository.save(superAdmin);
    
    return ResponseEntity.ok("Super Admin creado exitosamente");
}
```

Luego usa cURL o Postman:

```bash
curl -X POST http://localhost:9090/api/crear-super-admin-temporal \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Super Admin",
    "cedula": "1234567890",
    "telefono": "3001234567",
    "email": "superadmin@golreserve.com",
    "password": "admin123"
  }'
```

**⚠️ IMPORTANTE:** Elimina este endpoint después de crear el super admin.

## Opción 3: Script SQL para generar password hasheado

Si quieres usar la Opción 1, primero genera el hash de la contraseña:

### Usando una herramienta online:
1. Ve a: https://bcrypt-generator.com/
2. Ingresa tu contraseña (ej: `admin123`)
3. Rounds: 10
4. Copia el hash generado

### Usando código Java:
```java
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GenerarHash {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String password = "admin123";
        String hash = encoder.encode(password);
        System.out.println("Hash: " + hash);
    }
}
```

### Usando Node.js:
```javascript
const bcrypt = require('bcryptjs');
const password = 'admin123';
const hash = bcrypt.hashSync(password, 10);
console.log('Hash:', hash);
```

## Opción 4: Modificar un usuario existente

Si ya tienes un usuario CLIENTE, puedes cambiar su rol directamente en la BD:

```sql
-- Cambiar el rol de un usuario existente a SUPER_ADMINISTRADOR
UPDATE usuarios 
SET rol_usuario = 'SUPER_ADMINISTRADOR',
    estado_usuario = 'ACTIVO'
WHERE email = 'cristian@gmail.com';
```

---

## 📋 Credenciales Sugeridas

**Email:** `superadmin@golreserve.com`  
**Contraseña:** `Admin123!` (o la que prefieras)  
**Rol:** `SUPER_ADMINISTRADOR`  
**Estado:** `ACTIVO`

---

## ✅ Verificación

Después de crear el super admin:

1. **Inicia sesión** en la aplicación con las credenciales
2. Deberías ser redirigido automáticamente a: `#dashboard-super-admin`
3. Tendrás acceso a:
   - Gestión de Usuarios (`#admin-usuarios`)
   - Gestión de Administradores (`#admin-establecimientos`)
   - Estadísticas del sistema

---

## 🔒 Recomendaciones de Seguridad

1. ✅ Usa una contraseña fuerte para producción
2. ✅ Limita el número de super admins (1-2 máximo)
3. ✅ Nunca expongas el endpoint de creación en producción
4. ✅ Usa variables de entorno para credenciales sensibles
5. ✅ Habilita logs para acciones de super admin
