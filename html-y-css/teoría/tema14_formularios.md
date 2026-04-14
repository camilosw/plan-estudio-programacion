# Tema 14: Formularios

## Objetivo

Crear formularios interactivos para que los usuarios envíen
información, y aplicar estilos CSS para que se vean integrados.

## Explicación

Un formulario web es como un formulario en papel: tiene campos
para completar, opciones para elegir y un botón para enviar.

### Elementos principales de un formulario

- `<form>`: contenedor del formulario. Atributos importantes:
  - `action`: URL donde se envían los datos (se usa `"#"` en ejercicios)
  - `method`: `"post"` para envíos reales, `"get"` para búsquedas
- `<input>`: campo de entrada. Cambia según el atributo `type`:
  - `type="text"`: texto libre
  - `type="email"`: valida formato de email automáticamente
  - `type="tel"`: número de teléfono
  - `type="password"`: texto oculto
  - `type="radio"`: opción única de un grupo
  - `type="checkbox"`: opción que se puede marcar/desmarcar
- `<textarea>`: área de texto de múltiples líneas
- `<select>` + `<option>`: lista desplegable
- `<button type="submit">`: botón para enviar el formulario
- `<label>`: etiqueta vinculada a un campo.
  - El atributo `for` debe coincidir con el `id` del input.
  - Hacer clic en el label activa el campo correspondiente.
  - Importante para accesibilidad.
- `placeholder`: texto de ayuda dentro del campo (desaparece al escribir)
- `required`: marca el campo como obligatorio; el navegador lo valida
- `name`: nombre del campo para identificarlo al enviarlo

## Código de ejemplo

```html
<form action="#" method="post">
  <label for="nombre">Nombre completo *</label>
  <input
    type="text"
    id="nombre"
    name="nombre"
    placeholder="Sandra García"
    required
  />

  <label for="email">Correo electrónico *</label>
  <input
    type="email"
    id="email"
    name="email"
    placeholder="sandra@ejemplo.com"
    required
  />

  <label for="consulta">Tipo de consulta</label>
  <select id="consulta" name="consulta">
    <option value="">Selecciona una opción</option>
    <option value="reserva">Reserva de mesa</option>
  </select>

  <label for="mensaje">Mensaje</label>
  <textarea id="mensaje" name="mensaje" rows="5"></textarea>

  <input type="checkbox" id="terminos" name="terminos" required />
  <label for="terminos">Acepto recibir comunicaciones</label>

  <button type="submit">Enviar mensaje</button>
</form>
```

El ejemplo ejecutable está en [tema14_formularios.html](tema14_formularios.html)
y su CSS en [estilos_tema14.css](estilos_tema14.css).
